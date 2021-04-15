import { FC, useState } from "react"
import { Field, Form } from "react-final-form"
import styled from "styled-components"
import { required, composeValidators } from '../../Common/validators'
import { TChannel } from "../../Common/Types/TChannel"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { Button, MenuItem, Select, TextField, Checkbox } from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import SaveIcon from "@material-ui/icons/Save"
import { DateTimePickerAdapter } from "./Form Components/DateTimePickerAdapter"
import { durations } from "./Form Components/durations"
import { TValues } from "./Form Components/TValues"
import { createEvent } from "../../Store/myChannelReducer"
import { getChannelEvents } from "../../Store/myChannelReducer"
import { connect } from "react-redux"
import { TLanguage } from "../../Common/Types/TLanguage"

type TProps = {
  createEvent: any
  channel: TChannel | undefined
  setOpenModal: any
  imageUrl: string | undefined
  getChannelEvents: any
}

const CreateEventForm: FC<TProps> = ({ createEvent, channel, setOpenModal, imageUrl, getChannelEvents }) => {
  const [duration, setDuration] = useState("1hr")
  const onCreateEvent = async (values: TValues) => {
    const { name, author, datetime, languages, link, details } = { ...values }
    await createEvent({
      name,
      author,
      datetime: new Date(datetime),
      duration,
      details: details || "",
      languages,
      country: channel?.country,
      link,
      image: channel?.image,
      channelId: channel?.id,
      channelName: channel?.name,
      bookmark: false,
      approved: true
    })
    setOpenModal(false)
    getChannelEvents(channel?.id)
  }

  return (
    <Form
      onSubmit={onCreateEvent}
      initialValues={{ author: channel?.author, languages: channel?.languages }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <EventForm onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "1.4em", textAlign: "center" }}>New event</h2>
          <ImgPreview src={imageUrl} alt="image preview" />
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
              <TextField {...input} label="Author" required error={meta.touched && meta.error} helperText={meta.touched && meta.error} />
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

          <Field name="languages" validate={required}>
            {({ input, meta }) => (
              <FormControl required>
                <InputLabel>Select languages</InputLabel>
                <Select
                  {...input}
                  multiple
                  value={values.languages}
                  renderValue={(selected) =>
                    (selected as Array<TLanguage>).reduce((stack, curr) => {
                      return stack + ` ${curr.native},`
                    }, "").slice(0, -1)
                  }
                >
                  {channel?.languages.map((lang) => {
                    return (
                      //@ts-ignore
                      <MenuItem value={lang} key={lang.code}>
                        <Checkbox checked={values.languages.indexOf(lang) > -1} />
                        {lang.native}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )}
          </Field>

          <Field name="link" validate={required}>
            {({ input, meta }) => (
              <TextField {...input} label="Link" required error={meta.error && meta.touched} helperText={meta.touched && meta.error} />
            )}
          </Field>
          <Field name="details">{({ input }) => <TextField {...input} label="Details" multiline variant="outlined" />}</Field>

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

export default connect(null, { createEvent, getChannelEvents })(CreateEventForm)

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
