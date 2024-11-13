import requests

# Define the URL for your local webhook API
url = "http://localhost:3000/api/webhook"

# Payload to send in the POST request
payload = {
  "eventName": "DAC_VERIFY_TASK",
  "identity": {
  "address": "0x4370b20796150ff0752e768f0ab4a6e3ff40f0c0",
  "email": "user@example.com",
  "telegramId": "xxx",
  "gmail": "user@gmail.com",
      }, 
  "questId": "66fa06bdb54e5b16a7161f7e",
  "taskId": "019240aa-b3a9-7228-8a47-4f4c1628eb7b",
  "taskInfo": {
    "title": "Register an account",
    "description": "This is the task description",
    "type": "register",
    "link": "https://dac.metahub.finance"
  }
}



# Optional headers (if your webhook requires a secret or signature)
headers = {
    "Content-Type": "application/json",
    # Uncomment and modify the line below if your webhook uses a secret key for validation
    # "x-webhook-signature": "your-generated-signature",
}

# Make the POST request
try:
    response = requests.post(url, json=payload, headers=headers)
    # Print the response from the webhook API
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")

