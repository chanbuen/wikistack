const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 'default title'
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return '/wiki/' + this.urlTitle
        },
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false, 
        defaultValue : 'default content'
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false,
        // defaultValue : 'default status'
    }
}, {
    hooks: {
        beforeValidate: (page, options) => {
          page.urlTitle =  function generateUrlTitle (title) {
            if (title) {
                return title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                return Math.random().toString(36).substring(2, 7);
            }
          }
        }
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 'default user'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 'default email'
    }
});

module.exports =  {
  db: db,
  Page: Page,
  User: User
};