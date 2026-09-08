import styles from "./LoadingState.module.css";

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={`${styles.shimmer} ${styles.avatar}`} />
        <div className={styles.headerLines}>
          <div className={`${styles.shimmer} ${styles.lineMed}`} />
          <div className={`${styles.shimmer} ${styles.lineShort}`} />
        </div>
      </div>

      {/* Body lines */}
      <div className={styles.body}>
        <div className={`${styles.shimmer} ${styles.lineBody}`} />
        <div className={`${styles.shimmer} ${styles.lineBody}`} />
        <div className={`${styles.shimmer} ${styles.lineBody}`} />
        <div className={`${styles.shimmer} ${styles.lineBodyShort}`} />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="d-flex flex-column align-items-center gap-4 px-4 pt-5 pb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default LoadingState;
