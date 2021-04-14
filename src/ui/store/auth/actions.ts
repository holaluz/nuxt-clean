import { ActionTree } from 'vuex'
import { resetPassword } from '@@/src/container'

export enum ActionTypes {
  resetPassword = 'resetPassword',
}

type RootState = unknown

const actions: ActionTree<RootState, RootState> = {
  async [ActionTypes.resetPassword](_, password: string) {
    await resetPassword.execute(
      { password },
      {
        onSuccess: () => {
          console.log('Reset password requested')
        },
        onParseError: () => {
          console.log('Invalid Password')
        },
        onClientError: (error) => {
          console.log('ClientError', error.message)
        },
        onServerError: (error) => {
          console.log('ServerError', error.message)
        },
        onGenericError: (error) => {
          console.log('GenericError', error.message)
        },
      }
    )
  },
}

export default actions
