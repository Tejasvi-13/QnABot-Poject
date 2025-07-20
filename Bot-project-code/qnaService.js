const axios = require('axios');

async function queryQnA(question) {
  const endpoint = `${process.env.QNA_ENDPOINT}/language/:query-knowledgebases?projectName=${process.env.QNA_PROJECT_NAME}&deploymentName=${process.env.QNA_DEPLOYMENT_NAME}&api-version=${process.env.QNA_API_VERSION}`;

  console.log("Making request to:", endpoint);
  console.log("Question is:", question);
  console.log("Using key:", process.env.QNA_KEY);

  try {
    const response = await axios.post(
      endpoint,
      { question: question, top: 1 },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.QNA_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("QnA Response: ", JSON.stringify(response.data, null, 2));

    const answers = response.data.answers;
    if (answers && answers.length > 0 && answers[0].answer !== 'No answer found.') {
      return answers[0].answer;
    } else {
      return "Sorry, I couldn't find an answer.";
    }
  } catch (error) {
    console.error("QnA API call failed:", error.response?.data || error.message);
    return "There was an error processing your request.";
  }
}

module.exports = { queryQnA };
