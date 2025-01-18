import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import re

# Step 1: Load and Prepare Data
def load_data():
    # Example dataset structure (expand this with real-world data)
    data = {
        "content": [
            # Piracy-related words (20 items)
            "torrent",
            "cracked",
            "free download",
            "pirated",
            "illegal",
            "hack",
            "bypass",
            "unauthorized",
            "stolen",
            "leaked",
            "bootleg",
            "crack",
            "modded",
            "unlock",
            "cheat",
            "proxy",
            "warez",
            "keygen",
            "serial key",
            "premium free",

            # Piracy-related phrases (10 items)
            "Download free movies from this website",
            "Start downloading premium software for free",
            "Get free access to copyrighted material here",
            "Exclusive torrent links for free movie downloads",
            "Stream pirated TV shows instantly for free",
            "Download cracked versions of popular software",
            "Access free downloads of restricted videos",
            "Hack premium subscriptions with this tool",
            "Pirated software downloads available now",
            "Unlimited free downloads of premium content",

            # Legitimate words (20 items)
            "subscribe",
            "subscribe now",
            "official",
            "authorized",
            "legal",
            "purchase",
            "trial",
            "premium",
            "sign up",
            "licensed",
            "verified",
            "authentic",
            "exclusive",
            "safe",
            "original",
            "secure",
            "legitimate",
            "platform",
            "streaming",
            "trusted",

            # Legitimate phrases (10 items)
            "Start your free trial to access premium content legally",
            "Watch the latest episodes legally on our streaming platform",
            "Subscribe to our service for exclusive movie access",
            "Start your Free trial",
            "Enjoy premium music streaming with a subscription",
            "Download apps legally from the official app store",
            "Access movies and TV shows legally with our app",
            "Stream the latest blockbusters legally online",
            "Purchase official eBooks and audiobooks here",
            "Watch movies legally on authorized platforms"
        ],
        "label": [
            # Labels corresponding to the content (1 for piracy, 0 for non-piracy)
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    }

    # Debugging lengths
    print("Content length:", len(data["content"]))
    print("Label length:", len(data["label"]))

    return pd.DataFrame(data)

# Call the function to load data
# df = load_data()
# print(df.head())



# Step 2: Additional Feature Extraction
def extract_features(content):
    features = {
        "length": len(content),
        "num_links": len(re.findall(r'http[s]?://', content)),
        "contains_free": int("free" in content.lower()),
        "contains_download": int("download" in content.lower()),
        "contains_pirated": int("pirated" in content.lower())
    }
    return features

def build_feature_dataframe(df):
    feature_list = []
    for text in df["content"]:
        features = extract_features(text)
        feature_list.append(features)
    feature_df = pd.DataFrame(feature_list)
    return pd.concat([df, feature_df], axis=1)

# Step 3: Train Model
def train_model():
    # Load the data
    df = load_data()
    
    # Build features
    df = build_feature_dataframe(df)
    
    # Split into features and labels
    X_text = df["content"]
    X_features = df[["length", "num_links", "contains_free", "contains_download", "contains_pirated"]]
    y = df["label"]
    
    # Vectorize the text data
    vectorizer = TfidfVectorizer()
    X_text_vec = vectorizer.fit_transform(X_text)
    
    # Combine text vectorization and additional features
    from scipy.sparse import hstack
    X_combined = hstack([X_text_vec, X_features])
    
    # Split into training and testing datasets
    X_train, X_test, y_train, y_test = train_test_split(X_combined, y, test_size=0.2, random_state=42)
    
    # Train a Random Forest model for better performance
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print("Model Accuracy:", accuracy)
    print("Classification Report:\n", classification_report(y_test, y_pred))
    
    # Save the model and vectorizer
    model_path = os.path.join(os.path.dirname(__file__), "piracy_model.pkl")
    vectorizer_path = os.path.join(os.path.dirname(__file__), "tfidf_vectorizer.pkl")

    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)

    print(f"Model saved to {model_path}")
    print(f"Vectorizer saved to {vectorizer_path}")

# Step 4: Main Function
if __name__ == "__main__":
    train_model()
