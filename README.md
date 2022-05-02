# Presidential Suite Booking

# 1. language,framework and storage

node, express, joi, jest, supertest, dotenv.

the storage is simply in-memory.

# 2.how to run the program and test

- run the program

yarn start

- run the tests

yarn test

the date format should be like "5-20-2022"

# 3.the percentage of the test coverage

use yarn test to generate the percentage report

95.57% Statements 108/113

88.46% Branches 23/26

92.3% Functions 12/13

95.49% Lines 106/111

# 4.others

- routes: using a separate folder, in order to keep it scalable.

- the reservation id is user&#39;s first name +timestamp to let unique

- error-handling: using a separate folder to deal with errors. for now, only to push errors into a logs array, and returns the logs array length when error occurs.

- using joi library to validate the user input.
  the scheme is

Joi.object({

id: Joi.string().alphanum().min(1).max(30),

first_name: Joi.string().alphanum().min(1).max(30).required(),

last_name: Joi.string()

//.pattern(new RegExp(&#39;^[a-zA-Z]{3,30}$&#39;))

.alphanum()

.min(1)

.max(30)

.required(),

check_in: Joi.date().required(),

check_out: Joi.date().greater(Joi.ref(&#39;check_in&#39;)).required(),

number_people: Joi.number().integer().min(1).max(3).required(),

email: Joi.string()
.email({
minDomainSegments: 2,
tlds: { allow: [&#39;com&#39;, &#39;net&#39;] },
}).required(),

})
