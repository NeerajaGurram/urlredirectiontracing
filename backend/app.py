from flask import Flask, request, jsonify
from flask_cors import CORS
from trace_url import trace_url
from models.ai_model import analyze_content

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/trace', methods=['POST'])
def trace():
    data = request.json
    input_url = data.get('url')

    if not input_url:
        return jsonify({"error": "URL is required"}), 400

    # Trace the URL
    trace_result = trace_url(input_url)

    if "error" in trace_result:
        return jsonify(trace_result)

    # Extract additional features for analysis
    additional_features = {
        "length": len(trace_result.get("title", "") + trace_result.get("description", "")),
        "num_links": len(trace_result.get("outbound_links", [])),
        "contains_free": "free" in trace_result.get("description", "").lower(),
        "contains_download": "download" in trace_result.get("description", "").lower(),
        "contains_pirated": "pirated" in trace_result.get("description", "").lower()
    }

    # Analyze the content for piracy
    title = trace_result.get("title", "")
    description = trace_result.get("description", "")
    analysis_result = analyze_content(title, description, additional_features)

    # Combine trace and analysis results
    result = {**trace_result, **analysis_result}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
