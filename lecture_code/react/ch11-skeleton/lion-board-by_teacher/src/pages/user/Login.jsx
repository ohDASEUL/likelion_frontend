import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // Zustand store에서 사용자 정보 설정 함수 가져오기
  const setUser = useUserStore((store) => store.setUser);
  const navigate = useNavigate();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "zara@zara.com",
      password: "zara1234!",
    },
  });

  const axios = useAxiosInstance();

  // 로그인 mutation 설정
  // Login.jsx의 mutation 성공 핸들러 부분
  const login = useMutation({
    mutationFn: (formData) => axios.post(`/users/login`, formData),
    onSuccess: (res) => {
      console.log(res);

      // 로그인 성공 시 사용자 정보를 store에 저장
      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        image: user.profileImage, // profileImage 전체 객체를 저장
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      alert(res.data.item.name + "님, 로그인 되었습니다.");
      navigate(`/`); // 메인 페이지로 이동
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
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
