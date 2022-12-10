import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
The user will provide you with one or more anime series they loved, in the form of the User Input. Reccomend to the user 3 anime they should watch based on their inputted anime. For each anime reccomendation made to the user make sure to summarise the reccomendation with 4 sentences. Add an extra sentence that mentions some of the negatives of the anime. Give each reccomendation a rating out of 5. Append if the anime is dubbed or not, and the number of seasons and episodes.

User Input:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.9,
    max_tokens: 690,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

//The user will provide you with an anime they loved, in the form of the User Input. Reccomend to the user 3 anime they should watch based on their inputted anime. For each anime reccomendation made to the user make sure to summarise the reccomendation with 4 sentences. Add an extra sentence that mentions some of the negatives of the anime. Give each reccomendation a rating out of 5. Append if the anime is dubbed or not, and the number of seasons and episodes.

//User Input:

//The user will provide you with a book they loved, in the form of the User Input. Reccomend to the user 3 books they should read based on their inputted book. For each book reccomendation made to the user make sure to summarise the reccomendation with 4 sentences. Add an extra sentence that mentions some of the negatives of the book. Give each reccomendation a rating out of 5. Append how many pages the book is.

//User Input: 