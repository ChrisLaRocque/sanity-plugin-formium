import {defineField, defineType} from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'test',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
      }),
      defineField({
        name: 'formium',
        type: 'formiumSelect',
      }),
    ],
  }),
  //   defineType({
  //     name: 'formiumSelect',
  //     type: 'document',
  //     fields: [
  //       defineField({
  //         name: 'formId',
  //         type: 'string',
  //       }),
  //     ],
  //   }),
]
