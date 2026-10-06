import { useState } from 'react';
import RefineFrame from './RefineFrame';

export default function CertificateImage({ src, title, lang }) {
  const [status, setStatus] = useState('generating');
  const labels = lang === 'zh'
    ? { queued: '等待加载', generating: '加载中', refining: '逐步清晰', complete: '已加载', error: '加载失败' }
    : { queued: 'Queued', generating: 'Loading', refining: 'Refining', complete: 'Ready', error: 'Failed to load' };
  return (
    <RefineFrame className="certificate-refine" status={status} aspectRatio="1.6" width={720}
      radius={4} background="#eeece4" color="#58451f" stageDuration={100}
      hideAfter={1500} labels={labels} ariaLabel={title}>
      <img src={src} alt={title} loading="lazy" decoding="async"
        onLoad={() => setStatus('complete')} onError={() => setStatus('error')} />
    </RefineFrame>
  );
}
