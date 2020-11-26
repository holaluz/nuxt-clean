import { HttpInfrastructure } from '../infrastructure/http.infrastructure'

export const httpCore = new HttpInfrastructure(/* process.env.whatever */ '')
