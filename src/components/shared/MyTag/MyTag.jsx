export default function MyTag({children, style}) {
    const allStyles = {
        color: "#0958d9",
        backgroundColor: "#e6f4ff",
        border: "2px solid #91caff",
        borderRadius: "6px",
        marginBottom: "0.4rem",
        paddingBottom: "4px",
        paddingInline: "10px",
        display: "inline-flex",
        fontWeight: '400',
        fontSize: '1.2rem',
        ...style
    }
    return (
        <div style={allStyles}>
            {children}
        </div>
    )
}