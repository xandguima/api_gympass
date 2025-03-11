import { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Setup')
    return {
      teardown() {
        console.log('TearDown')
      },
    }
  },
  transformMode: 'ssr',
}
