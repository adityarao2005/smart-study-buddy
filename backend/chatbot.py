from flask import Flask, request, jsonify
import requests
import wolframalpha
import openai
import re
import os
from dotenv import load_dotenv


app = Flask(__name__)

load_dotenv()  # take environment variables from .env.

# Code of your application, which uses environment variables (e.g. from `os.environ` or
# `os.getenv`) as if they came from the actual environment.


client = wolframalpha.Client(os.getenv('WOLFRAM_APP_ID'))
openai.api_key = os.getenv('OPENAI_API_KEY')

# GPT wrapper for Wolfram


def GPTQuery(myInput):
    completion = openai.chat.completions.create(
        model="gpt-4o",
        temperature=0.2,   # Lower temperature values make the output less random
        max_tokens=256,
        # Instruct model on how to delegate:
        messages=[
            {"role": "system", "content": "You are a my study buddy friend, and you help me with my homework. Try to remember things we chat about."
                                          "However, if you're asked to provide to do a calculation, "
                                          "or answer a purely factual or analytical question that could "
                                          "be answered by Wolfram Alpha, delegate to Wolfram Alpha instead "
                                          "by outputting a query that Wolfram Alpha would understand. Indicate this "
                                          "scenario by formatting the output exactly like this: Query for "
                                          "WolframAlpha: <query>"},
            {"role": "user", "content": myInput},
        ]

    )

    chatGPTresponse = completion.choices[0].message.content

    # Checks to see if ChatGPT's response needs to be passed to Wolfram Alpha
    if "Query for WolframAlpha:" in chatGPTresponse:
        revisedWolframQuery = chatGPTresponse.replace(
            "Query for WolframAlpha:", "")
        print(revisedWolframQuery)
        return wolframQuery(revisedWolframQuery)
    # If not return GPT's response
    else:
        return chatGPTresponse

# This function processes queries through the Wolfram Alpha Short Answers API


def wolframQuery(userInput):
    # Define the API endpoint URL and the query parameters
    api_url = "https://api.wolframalpha.com/v1/spoken"
    params = {
        "appid": os.getenv('WOLFRAM_APP_ID'),
        "i": userInput
    }
    # Send the HTTP request to the API endpoint
    response = requests.get(api_url, params=params)
    # Check if the request was successful (i.e., HTTP status code 200)
    if response.status_code == 200:
        # Print the short answer returned by the API
        return f"According to Wolfram Alpha, {response.text}"
    else:
        # Print the error message returned by the API
        return f"Error: {response.text}"

# Flask route for the chatbot


@app.route('/chatbot', methods=['POST'])
def chatbot():
    while True:
        # prompt = input("You: ")
        # promptNew = prompt.lower()
        data = request.json
        prompt = data.get('prompt')

        if promptNew == "exit":
            break

        # Allows the user to override ChatGPT processing and process through Wolfram Alpha if a basic calculation is
        # entered or the user adds the word "wolfram" to their query
        if "ask wolfram:" in promptNew:
            promptNew = promptNew.replace("ask wolfram:", "").strip()
            # result = wolframQuery(promptNew)
            # print(result)
            response = wolframQuery(promptNew)

        else:
            # myResponse = GPTQuery(promptNew)
            # print(f"Bot: {myResponse}")
            response = GPTQuery(prompt)

        return jsonify({"response": response})


if __name__ == "__main__":
    # chatbot()
    app.run(debug=True)
