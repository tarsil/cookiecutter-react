# Cookiecutter React + Bootstrap 5

We all struggle to start a project with react and bootstrap.
This cookiecutter aims only to speedup that same start with a
given structure of folders and will be constantly updated.

This cookiecutter is a verbatim [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html)
with [bootstrap](https://getbootstrap.com/docs/5.1/)

This cookiecutter was designed to be used with any backend but it comes with
a working example how to integrate with Django backend and uses also [Django Cookiecutter](https://github.com/tarsil/cookiecutter-django)
as a django base app.

**Note:** To integrate with any other backend you must update the
`src/core/clients/AxiosClient.jsx` and `src/core/clients/TokenHelper.jsx` to match
your new settings.

## Table of Contents

---

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Information](#information)

---

## Requirements

1. [NodeJS](https://nodejs.org/en/)
2. [Cookiecutter](https://cookiecutter.readthedocs.io/en/1.7.2/)

## Installation

- `cookiecutter https://github.com/tarsil/cookiecutter-react` and follow the instructions

Disclaimer: You should aim to call your project without `-` but instead use `_`

## Information

The project comes with simple bootstrap integration and some folder structure.
