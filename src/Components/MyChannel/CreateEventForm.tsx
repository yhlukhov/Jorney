import { Field, Form } from "react-final-form"
import { required } from '../../Common/validators'
import { TChannel } from "../../Common/Types/TChannel"
import { FC, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import SaveIcon from "@material-ui/icons/Save"
import React from "react"
import FormControl from "@material-ui/core/FormControl"
import { DateTimePickerAdapter } from "./Form Components/DateTimePickerAdapter"
import { durations } from "./Form Components/durations"
import { TValues } from "./Form Components/TValues"
import styled from "styled-components"

type TProps = {
  createEvent: any
  channel: TChannel | undefined
  setOpenModal: any
  imageUrl: string|undefined
}

export const CreateEventForm: FC<TProps> = ({ createEvent, channel, setOpenModal, imageUrl }) => {
  const [duration, setDuration] = useState("1hr")

  const onCreateEvent = (values: TValues) => {
    const {name, author, datetime, language, link, details} = {...values}
    createEvent({
      name,
      author,
      datetime: new Date(datetime),
      duration,
      details:details||'',
      language,
      country: channel?.country.native,
      link,
      image:channel?.image,
      channelId: channel?.id,
      channelName: channel?.name
    })
    setOpenModal(false)
  }

  return (
    <Form
      onSubmit={onCreateEvent}
      initialValues={{ author: channel?.author, language: channel?.language.reduce((accum, val)=>{return accum + val.native + ', '}, '') }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <EventForm onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "1.4em", textAlign:"center" }}>New event</h2>
          <ImgPreview src={imageUrl} alt="image preview"/>
          <Field name="name" validate={required}>
            {({ input, meta }) => (
              <TextField
                {...input}
                label="Event Name"
                required
                error={meta.error && meta.touched}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="author" validate={required}>
            {({ input, meta }) => (
              <TextField {...input} label="Author" required error={meta.touched && meta.error} helperText={meta.touched && meta.error}/>
            )}
          </Field>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Field name="datetime" validate={required} component={DateTimePickerAdapter} />
          </MuiPickersUtilsProvider>
          <Field name="duration">
            {({ input }) => (
              <FormControl>
                <InputLabel id="select-duration">Duration</InputLabel>
                <Select
                  {...input}
                  labelId="select-duration"
                  value={duration}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => setDuration(e.target.value as string)}
                >
                  {durations.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
          <Field name="language" validate={required}>
            {({ input, meta }) => (
              <TextField {...input} label="Language" required error={meta.error && meta.touched} helperText={meta.touched && meta.error} />
            )}
          </Field>
          <Field name="link" validate={required}>
            {({ input, meta }) => (
              <TextField {...input} label="Link" required error={meta.error && meta.touched} helperText={meta.touched && meta.error} />
            )}
          </Field>
          <Field name="details">
            {({ input }) => (
              <TextField
                {...input}
                label="Details"
                multiline
                variant="outlined"
              />
            )}
          </Field>
          
          <div>
            <Button variant="outlined" color="primary" type="submit" startIcon={<SaveIcon />}>
              Save
            </Button>
          </div>
        </EventForm>
      )}
    />
  )
}


// Styled Components

const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80vw;
  min-width: 320px;
`
const ImgPreview = styled.img`
  max-width: 250px;
  max-height: 250px;
  border-radius: 15px;
  margin: 15px auto 0;
`