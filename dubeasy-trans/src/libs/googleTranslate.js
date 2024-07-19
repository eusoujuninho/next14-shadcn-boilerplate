const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Google Translate implementation
function googleTranslate(query = '', lang) {
  if (!query.trim()) return Promise.resolve('');
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.append('client', 'gtx');
  url.searchParams.append('sl', 'auto');
  url.searchParams.append('dt', 't');
  url.searchParams.append('tl', lang);
  url.searchParams.append('q', query);

  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          resolve(data[0].map((item) => item[0].trim()).join('\n'));
        } else {
          resolve('');
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// HuggingFace implementation (assuming you have the HuggingFace translation function)
async function huggingfaceTranslate(query = '', lang) {
  // ... (Your HuggingFace translation logic here)
  // Example:
  return new Promise((resolve, reject) => {
    // Replace with your actual HuggingFace translation call
    translateHuggingFace(query, lang)
      .then((text) => {
        resolve(text);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Function to select the translation service
function getTranslationService(provider) {
  switch (provider) {
    case 'google':
      return googleTranslate;
    case 'huggingface':
      return huggingfaceTranslate;
    default:
      throw new Error(`Invalid translation provider: ${provider}`);
  }
}

// Function to translate text
export default async function translateText(text, lang, provider = 'google') {
  const translationService = getTranslationService(provider);
  return translationService(text, lang);
}