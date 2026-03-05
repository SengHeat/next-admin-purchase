// components/purchasers/SkeletonRow.tsx
export function SkeletonRow() {
    const widths = [40, 160, 110, 80, 110, 110, 110, 70, 140]
    return (
        <tr style={{ borderBottom: '1px solid #23293a' }}>
            {widths.map((w, i) => (
                <td key={i} style={{ padding: '20px 24px' }}>
                    <div style={{
                        width:          w,
                        height:         13,
                        borderRadius:   5,
                        background:     'linear-gradient(90deg,#1e2530 25%,#252f3f 50%,#1e2530 75%)',
                        backgroundSize: '400% 100%',
                        animation:      'shimmer 1.4s ease infinite',
                    }} />
                </td>
            ))}
        </tr>
    )
}