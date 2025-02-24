import LoadingSpinner from '@/shared/components/loading-spinner';

export default function LoginProcess() {

  return (
    <div data-cid="div-e7SNzI" className="py-8 flex flex-col items-center justify-center space-y-4">
      <LoadingSpinner data-cid="LoadingSpinner-5f2T6T" />
      <div data-cid="div-ASWoJw" className="space-y-2 text-center">
        <h3 data-cid="h3-g2FBWS" className="text-lg font-medium">소셜 로그인 진행 중</h3>
        <p data-cid="p-nl2LNI" className="text-sm text-muted-foreground">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}
