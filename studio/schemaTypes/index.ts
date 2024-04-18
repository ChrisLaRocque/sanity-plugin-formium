import {defineField, defineType} from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'test',
    type: 'document',
    fields: [
      defineField({
        name: 'what',
        type: 'string',
      }),
      {
        name: 'who',
        type: 'image',
      },
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
