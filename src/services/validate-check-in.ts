import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from './erros/late-check-in-validate-error'

interface ValidateCheckInsServiceRequest {
  checkInId: string
}

interface ValidateCheckInsServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInsService {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsServiceRequest): Promise<ValidateCheckInsServiceResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)
    return {
      checkIn,
    }
  }
}
