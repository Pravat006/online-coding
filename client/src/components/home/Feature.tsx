
function Feature() {
    return (
        <section className="py-16 px-6 bg-gray-50 border-t border-gray-200 relative">
            <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
                Key Features for Coders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Feature Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-purple-400 transition-all duration-300 hover:shadow-xl">
                    <div className="text-5xl text-purple-500 mb-4">&lt;/&gt;</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Integrated Code Editor</h3>
                    <p className="text-gray-600">
                        Real-time collaborative code editing directly within your meet. Supports multiple languages with syntax highlighting and auto-completion.
                    </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
                    <div className="text-5xl text-blue-500 mb-4">&gt;_</div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Shared Terminal Access</h3>
                    <p className="text-gray-600">
                        Share your terminal or open a collaborative one. Debug together, run scripts, and solve problems in a shared environment.
                    </p>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
                    <div className="text-5xl text-green-500 mb-4">
                        {/* GitHub SVG icon */}
                        <svg className="inline w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Version Control Integration</h3>
                    <p className="text-gray-600">
                        Connect your GitHub, GitLab, or Bitbucket repositories. Discuss changes, review pull requests, and track progress live.
                    </p>
                </div>

                {/* Feature Card 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl">
                    <div className="text-5xl text-yellow-500 mb-4">
                        {/* Whiteboard SVG icon */}
                        <svg className="inline w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" />
                            <path d="M8 10h8M8 14h4" stroke="currentColor" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Interactive Whiteboard</h3>
                    <p className="text-gray-600">
                        Sketch architectural diagrams, brainstorm algorithms, and visualize complex systems with a powerful, shared canvas.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Feature