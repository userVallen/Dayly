# Dayly
Dayly is a simple web app that displays the weather information for a given location (altitude and longitude). It fetches weather data in real-time using the [Open-Meteo API](https://open-meteo.com/en/docs).

This project was created as a part of the fourth capstone project for the [Complete Full-Stack Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by Angela Yu on Udemy.


## Features
- Fetches weather information from [Open-Meteo API](https://open-meteo.com/en/docs).
- Displays weather condition, temperature, and other details.
- Clean and responsive UI.
- Built with Axios, Express.js, EJS, and vanilla CSS.

## Tech Stack
| Component | Technology |
|----------|------------|
| Backend | Node.js + Express.js |
| Frontend | HTML + CSS + Client-side JS |
| Templating | EJS |
| Weather API | [Open-Meteo API](https://open-meteo.com/en/docs) |
| HTTP Requests | Axios (server-side API calls) |
| Deployment | Render |

## Getting Started
### Live Demo
The demo is live on Render and is accessible via the following link: https://dayly.onrender.com/

### Local Setup
- Clone the repository:
    - ```git clone https://github.com/userVallen/Dayly.git```
    - ```cd Dayly```

- Install the dependencies:
    - ```npm install```

- Start the server:
    - ```npm start```

Then you can check the web app on http://localhost:3000

## How it Works
1. The user's location is processed on the server-side.
2. The server uses Axios to send a request to [Open-Meteo API](https://open-meteo.com/en/docs).
3. Weather data is processed, formatted, and passed to EJS templates.
4. The UI updates and displays the weather on the page.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
