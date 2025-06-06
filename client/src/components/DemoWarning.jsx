import { Info } from 'lucide-react';
export default function DemoWarning() {
    return (
        <div className="border border-red-400 text-red-800 p-6 flexjustify-between mb-1">
            <div className="flex flex-col items-left">
                <h4 className="text-lg font-semibold mb-2">
                    <Info className="inline-block mr-2" />
                    Demo Website
                </h4>
                <div className="flex items-center">
                    <span className="text-sm">
                        This website is for demonstration purposes only. Orders placed will not be fulfilled.
                        For updates, check out the project on <a href="https://github.com/miasdk/eCart" className="text-blue-500 hover:underline">GitHub</a>.

                    </span>
                </div>
            </div>
        </div>
    );
}