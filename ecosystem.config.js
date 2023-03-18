module.exports = {
    apps: [
        {
            name: "loveletter-server",
            script: "src/index.js",
            instances: 0,
            exec_mode: "cluster",
            wait_ready: true,
            listen_timeout: 50000,
            kill_timeout: 5000,
            watch: ["server", "client"],
            watch_delay: 2000,
            time: true,
        },
    ],
};
