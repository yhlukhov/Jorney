// Validators for form fields:
export const required = (value: any) => (value ? undefined : "Required")
export const minLength = (len: number) => (value: string) => (value.length >= len ? undefined : `Min length ${len} symbols`)
export const composeValidators = (...validators: Array<any>) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)
