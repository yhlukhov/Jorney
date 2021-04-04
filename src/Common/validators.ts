// Validators for form fields:
export const required = (value: any) => (value ? undefined : "Required")
export const minLength = (len: number) => (value: string) => (value.length >= len ? undefined : `Min length ${len} symbols`)
export const maxImgSize = (size: number) => (values: Array<File>) => (values[0].size > size ? `Max size of file ${Math.round(size/1000000)} Mb`: undefined)
export const composeValidators = (...validators: Array<any>) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)
