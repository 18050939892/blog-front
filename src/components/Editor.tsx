import MDEditor from '@uiw/react-md-editor';

export default function Editor({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    return <MDEditor value={value} onChange={value => onChange(value || '')} />;
}
