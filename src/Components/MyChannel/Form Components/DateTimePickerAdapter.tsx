import { IconButton, InputAdornment } from "@material-ui/core"
import { DateTimePicker } from "@material-ui/pickers"
import { useState } from "react"
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'

  //@ts-ignore
  export const DateTimePickerAdapter = ({ input: { onChange }, meta, ...rest }) => {
    const [date, setDate] = useState<Date|null>(null)
    return (
    <DateTimePicker
      {...rest}
      label="Select Date and Time"
      value={date}
      onChange={newdate=>{
        onChange(newdate)
        setDate(newdate)
      }}
      minutesStep={5}
      format="yyyy/MM/dd HH:mm"
      disablePast
      showTodayButton
      ampm={false}
      required
      autoOk
      fullWidth
      error={meta.error && meta.touched}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <ScheduleOutlinedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )}