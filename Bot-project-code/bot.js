const { ActivityHandler } = require('botbuilder');
const { queryQnA } = require('./qnaService');

class MyBot extends ActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const userQuestion = context.activity.text;
      await context.sendActivity("Sending your question to Azure...");
      const answer = await queryQnA(userQuestion);
      await context.sendActivity(answer);
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity('Welcome to your QnA Bot!');
        }
      }
      await next();
    });
  }
}

module.exports = { MyBot };
