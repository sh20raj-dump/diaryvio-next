"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CallToAction() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-violet-500 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 lg:p-16 text-white text-center">
            {isAuthenticated ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Welcome back, {session?.user?.name?.split(" ")[0] || "there"}!
                </h2>
                <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                  Continue your journaling journey and explore your memories with DiaryVio.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/diary"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Go to Diary
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your journaling experience?
                </h2>
                <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                  Join thousands of users who are documenting their lives, gaining insights, and building a meaningful relationship with their AI companion.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/login"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/diary"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    Try Demo
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
