"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserData } from "@/actions/getUserData";
import {
  Sun,
  Moon,
  LayoutDashboard,
  Target,
  Calendar,
  Hash,
  LogOut,
  MessageCircle,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const result = await getUserData(firebaseUser.uid);
        if (result.success) {
          setUserData(result.user);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Loading spinner
  const LoadingSpinner = ({ size = "h-6 w-6" }) => (
    <svg className={`animate-spin ${size}`} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Theme classes
  const theme = {
    light: {
      bg: "bg-stone-100",
      header: "border-stone-300 bg-white",
      title: "text-stone-800",
      subtitle: "text-stone-500",
      card: "bg-white/80 backdrop-blur-sm border-stone-300",
      innerCard: "bg-stone-50 border-stone-200",
      cardLabel: "text-stone-500",
      cardValue: "text-stone-800",
      cardValueAccent: "text-teal-600",
      cardValueMono: "text-stone-600",
      signOut: "text-stone-500 hover:text-stone-700",
      toggleBtn: "bg-stone-200 text-stone-600 hover:bg-stone-300",
      welcomeText: "text-stone-700",
      actionCard:
        "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-300",
      actionCardTitle: "text-teal-700",
      actionCardDesc: "text-teal-600/80",
      actionCardIcon: "bg-teal-100 text-teal-600",
    },
    dark: {
      bg: "bg-stone-900",
      header: "border-stone-700 bg-stone-800",
      title: "text-stone-100",
      subtitle: "text-stone-400",
      card: "bg-stone-800/50 backdrop-blur-sm border-stone-700",
      innerCard: "bg-stone-900 border-stone-800",
      cardLabel: "text-stone-500",
      cardValue: "text-stone-300",
      cardValueAccent: "text-teal-500",
      cardValueMono: "text-stone-400",
      signOut: "text-stone-400 hover:text-stone-200",
      toggleBtn: "bg-stone-700 text-stone-300 hover:bg-stone-600",
      welcomeText: "text-stone-300",
      actionCard:
        "bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border-teal-700/50 hover:border-teal-600",
      actionCardTitle: "text-teal-400",
      actionCardDesc: "text-teal-500/80",
      actionCardIcon: "bg-teal-900/50 text-teal-400",
    },
  };

  const t = darkMode ? theme.dark : theme.light;

  if (loading) {
    return (
      <div
        className={`min-h-screen ${t.bg} flex items-center justify-center transition-colors duration-300`}
      >
        <div className={`flex items-center gap-3 ${t.subtitle}`}>
          <LoadingSpinner />
          <span className="text-sm font-mono uppercase tracking-wider">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${t.bg} transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`border-b ${t.header} transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600 rounded-lg">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl font-light ${t.title} transition-colors duration-300`}
              >
                Dashboard
              </h1>
              <p
                className={`text-xs ${t.subtitle} font-mono uppercase tracking-wider transition-colors duration-300`}
              >
                Welcome back
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${t.toggleBtn} transition-colors duration-300`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={handleSignOut}
              className={`flex items-center gap-2 text-sm ${t.signOut} transition-colors duration-300`}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Card */}
        <div
          className={`${t.card} border rounded-2xl p-8 mb-8 transition-colors duration-300`}
        >
          <h2
            className={`text-2xl font-light ${t.title} mb-2 transition-colors duration-300`}
          >
            Hello, {user?.email?.split("@")[0]}
          </h2>
          <p className={`${t.welcomeText} text-sm transition-colors duration-300`}>
            Here's an overview of your account and progress.
          </p>
        </div>

        {userData && (
          <>
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Target Days Card */}
              <div
                className={`${t.innerCard} border rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-600/10 rounded-lg">
                    <Target className="h-5 w-5 text-teal-500" />
                  </div>
                  <p
                    className={`text-xs font-medium ${t.cardLabel} uppercase tracking-wider transition-colors duration-300`}
                  >
                    Target Days
                  </p>
                </div>
                <p
                  className={`text-4xl font-light ${t.cardValueAccent} transition-colors duration-300`}
                >
                  {userData.targetDays}
                </p>
              </div>

              {/* Account Created Card */}
              <div
                className={`${t.innerCard} border rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-600/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-teal-500" />
                  </div>
                  <p
                    className={`text-xs font-medium ${t.cardLabel} uppercase tracking-wider transition-colors duration-300`}
                  >
                    Account Created
                  </p>
                </div>
                <p
                  className={`text-lg ${t.cardValue} transition-colors duration-300`}
                >
                  {new Date(userData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* User ID Card */}
              <div
                className={`${t.innerCard} border rounded-xl p-6 transition-colors duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-600/10 rounded-lg">
                    <Hash className="h-5 w-5 text-teal-500" />
                  </div>
                  <p
                    className={`text-xs font-medium ${t.cardLabel} uppercase tracking-wider transition-colors duration-300`}
                  >
                    User ID
                  </p>
                </div>
                <p
                  className={`text-sm ${t.cardValueMono} font-mono truncate transition-colors duration-300`}
                >
                  {userData.firebaseUid}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href="/chat-mechanic"
                className={`${t.actionCard} border rounded-xl p-6 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 ${t.actionCardIcon} rounded-xl transition-colors duration-300`}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-medium ${t.actionCardTitle} mb-1 transition-colors duration-300`}
                    >
                      Relationship Mechanic
                    </h3>
                    <p
                      className={`text-sm ${t.actionCardDesc} transition-colors duration-300`}
                    >
                      Start a diagnostic session
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
