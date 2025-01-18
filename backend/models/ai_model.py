import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import os

# Load the model and vectorizer
model_path = os.path.join(os.path.dirname(__file__), "piracy_model.pkl")
vectorizer_path = os.path.join(os.path.dirname(__file__), "tfidf_vectorizer.pkl")

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
except FileNotFoundError:
    raise Exception(f"Model or vectorizer not found. Train the model first.")

def analyze_content(title, description, additional_features):
    """
    Analyze the given metadata for piracy content.

    Args:
    - title (str): The title of the page.
    - description (str): The meta description of the page.
    - additional_features (dict): Additional features extracted from the content.

    Returns:
    - dict: A dictionary with prediction and probability.
    """
    # Combine title and description
    content = f"{title} {description}"
    content_vector = vectorizer.transform([content])

    # Combine text vector with additional features
    from scipy.sparse import hstack
    additional_vector = [[
        additional_features.get("length", 0),
        additional_features.get("num_links", 0),
        additional_features.get("contains_free", 0),
        additional_features.get("contains_download", 0),
        additional_features.get("contains_pirated", 0)
    ]]
    combined_vector = hstack([content_vector, additional_vector])

    # Predict piracy content
    prediction = model.predict(combined_vector)[0]
    probability = model.predict_proba(combined_vector)[0][1]

    is_piracy = bool(probability >= 0.5)

    return {"is_piracy": is_piracy, "probability": probability}

