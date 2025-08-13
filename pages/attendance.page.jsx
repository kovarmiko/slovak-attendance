import React from 'react'
import Attendance from '../src/Attendance'

export const documentProps = {
  title: 'Attendance — Vykazuje',
  description: 'Track and manage attendance.',
}

export { Page }

function Page() {
  return <Attendance />
}
