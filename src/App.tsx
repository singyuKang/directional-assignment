import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Login은 초기 진입점이므로 즉시 로드
import Login from "@/pages/Login";

// 나머지 페이지들은 Lazy Loading
const PostList = lazy(() => import("@/pages/PostList"));
const PostCreate = lazy(() => import("@/pages/PostCreate"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const PostEdit = lazy(() => import("@/pages/PostEdit"));
const Charts = lazy(() => import("@/pages/Charts"));

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PostList />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PostCreate />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PostDetail />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PostEdit />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/charts"
            element={
              <PrivateRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <Charts />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/posts" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
