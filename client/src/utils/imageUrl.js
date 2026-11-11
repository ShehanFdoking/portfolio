const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return '';
    }

    if (/^(data:|https?:\/\/|\/\/)/i.test(imageUrl)) {
        return imageUrl;
    }

    return `${API_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};
