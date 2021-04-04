import { FC, InputHTMLAttributes } from "react"
import { Field } from "react-final-form"
import styled from 'styled-components'
import { maxImgSize } from '../validators'
import { TChannel } from '../Types/TChannel'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  uploadImage:any
  channel:TChannel|undefined
}

export const FileField: FC<Props> = ({ name, uploadImage, channel }) => (
  <Field<FileList> name={name} >
    {({ input: { value, onChange, ...input } }) => (
      <>
        <Label htmlFor="image-file">Update image</Label>
        <Input id="image-file" {...input} type="file" onChange={(e) => {
          let files = e.target.files
          onChange(files)
          if(files && channel) {
            uploadImage(`${channel.name}/${files[0].name}`, files[0])
          }
        }} />
      </>
    )}
  </Field>
)


// Styled Components

const Label = styled.label`
  color: grey;
  font-size: 0.9em;
  display: block;
  height: 35px;
  padding-top: 5px;
  border-bottom: 1.5px solid grey;
  cursor: pointer;
`

const Input = styled.input`
  display:none
`