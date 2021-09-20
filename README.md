<!-- <p align="center">
<img src="https://user-images.githubusercontent.com/7778803/133946229-ee266524-10ba-4e1e-9a73-959a2231ed19.png" size="80" />
</p> -->

# KDS ERP  -----------  ``` Must Read 👇 ```

<br />
<br />

<p align="center">
<img src="https://user-images.githubusercontent.com/7778803/133667983-58a8451f-de59-46c7-b216-ef42004705b3.png" width="64" /> &nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/7778803/101231592-18abb080-36ce-11eb-8590-f6827edf76f2.png" width="64" /> &nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/7778803/101231623-498be580-36ce-11eb-81f1-cd0b6021f5db.png" width="64" />
<img src="https://user-images.githubusercontent.com/7778803/101232179-d5534100-36d1-11eb-9395-02014198eaf2.png" width="64" />
<img src="https://user-images.githubusercontent.com/7778803/101231887-f3b83d00-36cf-11eb-8e51-81862e0c9d31.png" width="64" />
<img src="https://user-images.githubusercontent.com/7778803/133668434-1f155632-49fb-4182-b740-3b8e8846d7ca.png" width="64" /> &nbsp;&nbsp;
</p>

<br />
<br />

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---------------------------------

## Inspirations for Clean Code and Clean Architecture 

[NodeJS Best Practices](https://github.com/goldbergyoni/nodebestpractices)

[Martin Fowler](https://martinfowler.com)

[Uncle Bob](https://8thlight.com/blog/uncle-bob/2011/09/30/Screaming-Architecture.html) (Robert C Martin)

---------------------------------

> ## Good programming practices. 
An over view of industries best coding practices, I used to structure this project. 
1. Structured my solution by self-contained and reusable components. [[Ref.]](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)
2. Layered components
3. Centralized Error Handling
4. Global Validations/Guards
5. Documented the API
6. Used linters to enforce **code quality** and consistency.
7. Used comments as a last resort, tried to write self explaining code.
8. Sanitizing the incoming data.
9. Type checking for ENVs.
10. Dependency Injection and Inversion of control.
11. DRY, KISS, SRP & SOLID principles were used.

## Project Architecture and Structure

This project is designed using Modular Monolithic Architecture. Each module is **self-contained** and easily extensible. Application is designed to stand changing requirements and for high scalability.

Introducing the new functionality or making some change in existing one will not break the whole app.

This projects has [Screaming Architecture](https://8thlight.com/blog/uncle-bob/2011/09/30/Screaming-Architecture.html) 📢

> ### Project Structure
```
- src
  - db
    - schemas
  - common
  - lib
  - decorators
  - emailTemplates
  - guards // global guards
  - modules // core modules of the application
    - auth
      - auth.controllers.ts
      - auth.controller.spec.ts // controller tests
      - auth.services.ts
      - auth.services.spec.ts // services tests
      - auth.module.ts
    - therapist
    - children
    - therapySchedules
    - payment
    - users
  - types // global types

```

## License

Nest is [MIT licensed](LICENSE).
