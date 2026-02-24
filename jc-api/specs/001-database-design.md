# 001-database-design

## Tables

### users
id
name
email
password

### jobs
id
jobTechId
headline
employer
description
logo_url
contact_name
contact_email
contacht_phone
skills_required
location
notes
application_deadline
application_status

foreign: user id

### contacts
company
emails
phones
notes

foreign jobs id


