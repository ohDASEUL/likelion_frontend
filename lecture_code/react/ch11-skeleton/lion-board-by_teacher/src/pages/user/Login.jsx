/**
 * 사용자 로그인을 처리하는 컴포넌트
 * 이메일과 비밀번호를 입력받아 사용자 인증을 수행합니다.
 */

// 필요한 의존성 import
import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  // Zustand store에서 사용자 정보를 설정하는 함수를 가져옴
  const setUser = useUserStore((store) => store.setUser);

  // 페이지 네비게이션을 위한 hooks
  const navigate = useNavigate();
  const location = useLocation(); // 이전 페이지 정보를 저장하기 위해 사용

  // react-hook-form 설정
  const {
    register, // 입력 필드 등록
    handleSubmit, // 폼 제출 핸들러
    formState: { errors }, // 유효성 검사 오류 상태
    setError, // 수동으로 오류를 설정하는 함수
  } = useForm({
    // 개발 환경에서 테스트를 위한 기본값 설정
    defaultValues: {
      email: "jimmyKudo@detective.com",
      password: "Kudo1234",
    },
  });

  // 커스텀 axios 인스턴스 사용
  const axios = useAxiosInstance();

  // 로그인 mutation 설정
  const login = useMutation({
    // 서버에 로그인 요청을 보내는 함수
    mutationFn: (formData) => axios.post(`/users/login`, formData),

    // 로그인 성공 시 처리
    onSuccess: (res) => {
      console.log(res);

      // 서버로부터 받은 사용자 정보를 전역 상태에 저장
      const user = res.data.item;
      setUser({
        _id: user._id, // 사용자 고유 ID
        name: user.name, // 사용자 이름
        profile: user.image?.path, // 프로필 이미지 경로 (옵셔널)
        accessToken: user.token.accessToken, // JWT 액세스 토큰
        refreshToken: user.token.refreshToken, // JWT 리프레시 토큰
      });

      // 로그인 성공 메시지 표시
      alert(res.data.item.name + "님, 로그인 되었습니다.");
      // 이전 페이지가 있으면 해당 페이지로, 없으면 홈으로 이동
      navigate(location.state?.from || `/`);
    },

    // 에러 처리
    onError: (err) => {
      console.error(err);
      // 서버에서 반환된 유효성 검사 에러 처리
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        // 기타 에러 메시지 표시
        alert(err.response?.data.message || "잠시후 다시 요청하세요.");
      }
    },
  });

  return (
    <>
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>

          <form onSubmit={handleSubmit(login.mutate)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { required: "이메일은 필수입니다." })}
              />
              <InputError target={errors.email} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
              />
              <InputError target={errors.password} />
              <Link
                to="#"
                className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                로그인
              </button>
              <Link
                to="/users/signup"
                className="ml-8 text-gray-800 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
