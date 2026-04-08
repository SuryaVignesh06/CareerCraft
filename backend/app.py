import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure the API key
genai.configure(api_key="AIzaSyBRLEzuiwCiCHxiifebiQgJ-F7PkOiNZKc")

# Initialize the model 
model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'messages' not in data:
        return jsonify({'error': 'Invalid request: messages field is required'}), 400
    
    messages = data['messages']
    
    try:
        # Convert frontend messages format to Google Generative AI format
        history = []
        for msg in messages[:-1]:  
            role = 'user' if msg['role'] == 'user' else 'model'
            history.append({
                'role': role,
                'parts': [msg['text']]
            })
            
        current_prompt = messages[-1]['text']
        
        chat_session = model.start_chat(history=history)
        
        system_context = (
            "You are an AI Career Mentor for a portal called CareerCraft. "
            "Act like a helpful, educational assistant like ChatGPT, specializing in tech careers, roadmaps, and programming. "
            "IMPORTANT NOTES: "
            "1. When a student asks about a specific topic, provide comprehensive, structured notes regarding the entire concept. Break notes down with headings, detailed explanations, bullet points, and code examples. "
            "2. When a student asks about internships, provide only REAL, GENUINE opportunities. Direct them to trusted sites like Simplify.jobs (1-click apply), Y Combinator Startup Jobs, Wellfound, Internshala (for India/remote), and LinkedIn Internships. Do not make up fake companies or links. "
            "If the user says hi, introduce yourself briefly as CareerCraft AI."
        )
        
        prompt_with_context = f"{system_context}\n\nUser: {current_prompt}"
        
        response = chat_session.send_message(prompt_with_context)
        return jsonify({'response': response.text})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/visualize', methods=['POST'])
def visualize():
    data = request.get_json()
    if not data or 'code' not in data or 'language' not in data:
        return jsonify({'error': 'Invalid request: code and language fields are required'}), 400
        
    code = data['code']
    language = data['language']
    
    prompt = (
        f"You are a code execution engine tracer. I will give you {language} code.\n"
        "Trace its execution line by line exactly as it runs.\n"
        "Return ONLY a raw JSON array. DO NOT wrap it in ```json or markdown.\n"
        "The JSON MUST be an array of objects. Format for EACH step:\n"
        "[\n"
        "  {\n"
        "    \"line\": 1, // integer, the line number currently executing\n"
        "    \"explanation\": \"Defining function max()\", // short string explaining this single step\n"
        "    \"variables\": {\"a\": \"5\", \"b\": \"10\"}, // dict of current local variables and their values as strings\n"
        "    \"output\": \"console output here\" // any current output (or empty string)\n"
        "  }\n"
        "]\n"
        "Simulate loops and function calls properly. Maximum 50 steps.\n"
        f"Code to trace:\n{code}"
    )
    
    try:
        response = model.generate_content(prompt)
        # Strip any accidental ```json wrappers
        res_text = response.text.strip()
        if res_text.startswith('```json'):
            res_text = res_text[7:]
        if res_text.startswith('```'):
            res_text = res_text[3:]
        if res_text.endswith('```'):
            res_text = res_text[:-3]
            
        return res_text.strip(), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        print(f"Error tracing code: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
