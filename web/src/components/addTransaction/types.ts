import { FormEvent } from 'react'

export interface Props {
  value?: number
  onButtonClick: (event: FormEvent) => void
  onInputChange: (value: string) => void
  isLoading: boolean
  error: string
}
