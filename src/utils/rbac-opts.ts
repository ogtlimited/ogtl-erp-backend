export const opts =  {
    hr_user: { // Role name
        can: [ // list of allowed operations
          'post:save', 
          { 
              name: 'user:*',
              when: async (params) => params.userId.toString() === params.ownerId.toString() && params.status.includes('open')
          },
          'user:create',
          {
            name: 'post:update',
            when: async (params) => params.userId.toString() === params.ownerId.toString()
          }
        ]
      },
      hr_manager: {
        can: ['post:save', 'post:delete', 'post:update', 'post:readAll', 'user:*', 'hr:approve'],
        inherits: ['hr_user']
      },
      coo: {
        can: [
            'coo:create',
            {
                name: 'coo:*',
                when: async (params) => params.userId.toString() === params.ownerId.toString() && params.status.includes('open')
            }
        ],
        inherits: ['hr_manager']
      },
      ceo: {
        can: ['ceo:super', 'coo:*'],
        inherits: ['coo']
      }
};