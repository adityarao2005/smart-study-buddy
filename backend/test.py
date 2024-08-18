"""
Conversational API 
- Returns text results phrased in full sentence form along with a token for making a related follow-up query 
- Infterface for personal assistants, reference apps  and continuous dialog 

Full Results API -> Search 
- Free form queries one might enter at the Wolfram alpha site and for the computed results to be returned in a variety of formats.

LLM API 
- Specifically for use with large language models and chat products 

Spoken Results API 
- Returns text results pjhrased in full sentence form, Idea for applications that use a text-to-speech component to deliver a spoken result to the user 
"""
import requests
import urllib.parse

# Replace with your Wolfram Alpha AppID
app_id = "UU5QRR-634J63WQ57"



question = "Where are Falkland Islands?"
location = "47.01,16.93"
query_url = f"http://api.wolframalpha.com/v1/conversation.jsp?" \
            f"appid={appid}" \
            f"&geolocation={appid}" \
            f"&i={question}" \

r = requests.get(query_url).json()
answer = r["result"]
conversation_id = r["conversationID"]
host = r["host"]

print(f"{question}: '{answer}'")

followup_question = "How far is it from here?"
query_url = f"http://{host}/api/v1/conversation.jsp?" \
            f"appid={appid}" \
            f"&conversationID={conversation_id}" \
            f"&i={followup_question}" \

r = requests.get(query_url).json()
answer = r["result"]
print(f"{followup_question}: '{answer}'")
