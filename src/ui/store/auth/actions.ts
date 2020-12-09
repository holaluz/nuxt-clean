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
        respondWithSuccess: () => {
          console.log('Reset password requested')
        },
        respondWithParseError: () => {
          console.log('Invalid Password')
        },
        respondWithClientError: (error) => {
          console.log('ClientError', error.message)
        },
        respondWithServerError: (error) => {
          console.log('ServerError', error.message)
        },
        respondWithGenericError: (error) => {
          console.log('GenericError', error.message)
        },
      }
    )
  },
}

export default actions
