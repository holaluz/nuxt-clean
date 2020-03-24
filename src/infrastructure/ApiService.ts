import Axios, { AxiosRequestConfig } from 'axios'
import { User } from '@domain/User'

const API_URL: string = process.env.API_URL || ''

type Options = AxiosRequestConfig
type RequestWithoutData = (
  url: string,
  user: User,
  options: Options
) => Promise<any>
type RequestWithData = (
  url: string,
  user: User,
  data: object,
  options: Options
) => Promise<any>

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const get: RequestWithoutData = (url, user, options = {}) =>
  axios.get(url, addToken(options, user))

const post: RequestWithData = (url, user, data = {}, options = {}) =>
  axios.post(url, data, addToken(options, user))

function addToken(options: Options, user: User): Options {
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Token ${user.token}`
    }
  }
}

export { post, get }
