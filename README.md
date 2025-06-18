# Vemer Frontend ✨

Vemer is a modern, feature-rich web application designed to connect people with volunteering opportunities and community events. It gamifies the experience of giving back, allowing users to earn points, unlock badges, and climb the leaderboard by participating in activities. Publishers can create and manage their own events, engaging with a vibrant community of volunteers.

Built with the latest web technologies, this project serves as a robust foundation for a community engagement platform.

## 🚀 Key Features

  * **Secure Authentication**: Easy registration and login with email/password, plus Single Sign-On (SSO) with Google.
  * **Dynamic Activity Discovery**: Browse, search, and filter activities by category, date, location, and more.
  * **Gamified Experience**: Earn points and unlock unique badges for participation, and see how you stack up on the community leaderboard.
  * **Personalized User Dashboard**: A central hub for users to track their stats, view upcoming events, discover recommendations, and manage their earned badges.
  * **Comprehensive Publisher Dashboard**: A dedicated dashboard for event organizers to create, manage, and monitor their activities, participants, and notifications.
  * **Engaging Notification System**: Keep participants informed with timely updates and reminders about events.
  * **Modern & Animated UI/UX**: Built with the popular **shadcn/ui** and **Tailwind CSS**, featuring fluid animations powered by **Framer Motion**.

-----

## 🛠️ Tech Stack

This project is built using a modern and powerful tech stack:

* **Framework**:  [![Next.js][nextjs-badge]][nextjs-link]
* **Language**:  [![TypeScript][typescript-badge]][typescript-link]
* **Styling**:  [![Tailwind CSS][tailwind-badge]][tailwind-link]
* **UI Components**:  [![Shadcn UI][shadcn-badge]][shadcn-link]
* **Animations**:  [![Framer Motion][framer-badge]][framer-link]
* **Form Handling**:  [![React Hook Form][rhf-badge]][rhf-link] & [![Zod][zod-badge]][zod-link]
* **API Client**:  [![Axios][axios-badge]][axios-link]
* **Icons**:  [![Lucide][lucide-badge]][lucide-link]

-----

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You need to have **Node.js (version 18.17.0 or higher)** and a package manager (**npm**, **yarn**, or **pnpm**) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/vemer-frontend.git
    cd vemer-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project. The primary variable you'll need is the backend API URL.

    ```env
    # .env.local
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

-----

## 📁 Project Structure

The project follows the Next.js App Router structure for clear organization and scalability.

```
vemer-frontend/
├── src/
│   ├── app/                    # All pages and layouts
│   │   ├── (main)/             # Main application layout and pages (Home, etc.)
│   │   ├── activities/         # Activity Browse and details pages
│   │   ├── auth/               # Authentication pages (Login, Register)
│   │   ├── user-dashboard/     # Personalized dashboard for volunteers
│   │   └── publisher-dashboard/  # Dashboard for event organizers
│   ├── api/                    # API request definitions (Axios)
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Core UI components from shadcn/ui
│   │   ├── user-dashboard/     # Components specific to the user dashboard
│   │   └── publisher-dashboard/  # Components specific to the publisher dashboard
│   ├── constants/              # Global constants (nav links, themes, etc.)
│   ├── context/                # React context providers (e.g., AuthContext)
│   ├── hooks/                  # Custom React hooks (e.g., useAuth, useTheme)
│   ├── lib/                    # Utility functions and libraries (e.g., cn, verify-auth)
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets (images, fonts)
└── tailwind.config.ts          # Tailwind CSS configuration
```

-----

## ☁️ API Endpoints

The frontend communicates with a backend API for all dynamic data. The API calls are organized by feature in the `src/api` directory.

  * **`AuthAPI`**: Handles user registration, login, logout, and SSO.
  * **`ActivityAPI`**: Fetches details for specific activities.
  * **`LeaderboardAPI`**: Retrieves leaderboard data and community stats.
  * **`ProfileAPI`**: Fetches the current user's profile information.
  * **`UserDashboardAPI`**: Gets all data for the user dashboard, including stats, events, and recommendations.
  * **`PublisherDashboardAPI`**: (Assumed) Handles data for the publisher dashboard.

The base API URL is configured in `src/api/index.ts`.

-----

## 📸 Screenshots

*Add screenshots of your application here to showcase its features and UI.*

| Login Page                                       | Activity Feed                                       |
| ------------------------------------------------ | --------------------------------------------------- |
| \<img src="" alt="Login Page Screenshot" width="400"\> | \<img src="" alt="Activity Feed Screenshot" width="400"\> |

-----

## 📜 License

This project is licensed under the MIT License.

-----

## 🙏 Acknowledgements

A big thank you to the creators and maintainers of these amazing open-source projects that made Vemer possible:

  * [Next.js](https://nextjs.org/)
  * [shadcn/ui](https://ui.shadcn.com/)
  * [Tailwind CSS](https://tailwindcss.com/)
  * [Framer Motion](https://www.framer.com/motion/)


[nextjs-badge]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[typescript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[shadcn-badge]: https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge
[framer-badge]: https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white
[rhf-badge]: https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white
[zod-badge]: https://img.shields.io/badge/Zod-3E6F9F?style=for-the-badge
[axios-badge]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[lucide-badge]: https://img.shields.io/badge/Lucide-22c55e?style=for-the-badge&logo=lucide&logoColor=white

[nextjs-link]: https://nextjs.org/
[typescript-link]: https://www.typescriptlang.org/
[tailwind-link]: https://tailwindcss.com/
[shadcn-link]: https://ui.shadcn.com/
[framer-link]: https://www.framer.com/motion/
[rhf-link]: https://react-hook-form.com/
[zod-link]: https://zod.dev/
[axios-link]: https://axios-http.com/
[lucide-link]: https://lucide.dev/
