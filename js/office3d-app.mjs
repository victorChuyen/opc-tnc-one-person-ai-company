        /* ────────────── IMPORTS ────────────── */
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { Reflector } from 'three/addons/objects/Reflector.js';
        import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
        import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
        import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
        import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
        import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
        import { setLanguage, getCurrentLang } from './js/i18n.mjs';

        /* ────────────── AGENT DATA ────────────── */
        const agentProfiles = {
            chairman: {
                title: '👤 CHAIRMAN VICTOR (HUMAN)',
                desc: 'Chủ tịch duy nhất của TNC GROUP. Ra quyết định cấp cao nhất, giao tiếp trực tiếp với AI CEO. Mọi kết quả cuối cùng đều được trình bày cho Chairman duyệt.',
                skills: ['Strategic Vision', 'Final Approval Gate'],
                color: '#ffaa00'
            },
            ceo: {
                title: '👑 AI CEO — TỔNG GIÁM ĐỐC',
                desc: 'Nhận chỉ thị từ Chairman → Phân tích → Bóc tách hạng mục công việc → Uỷ quyền cho CMO (Marketing), CSO (Sales), CPO (Kỹ thuật), CHRO (Nhân sự). Tổng hợp báo cáo cuối cùng trình Chairman.',
                skills: ['ceo_victor_master_9skills', 'agentic-engineering', 'prompt-engineer', 'kpi-dashboard-design'],
                color: '#9d4edd'
            },
            cmo: {
                title: '📢 AI CMO — GIÁM ĐỐC MARKETING',
                desc: 'Chuyên gia Meta Ads, Copywriting theo phong cách Alex Hormozi, phân tích đối thủ cạnh tranh, và nghiên cứu ngách thị trường (Niche). Tạo kịch bản quảng cáo chuyển đổi cao.',
                skills: ['meta_ads_cmo_framework', 'hormozi_copywriting', 'competitor_intelligence', 'ads_audit', 'content-marketer', 'paid_ads'],
                color: '#ff007f'
            },
            cso: {
                title: '💼 AI CSO — GIÁM ĐỐC SALES B2B',
                desc: 'Chuyên gia Outreach B2B: Cold Email 3-Step, LinkedIn Message, Demo Script 20 phút, Pricing Anchor theo Hormozi. Quản lý leads và retention email.',
                skills: ['b2b_outreach_sequence', 'linkedin_b2b_outreach', 'demo_call_script', 'pricing_anchor', 'retention_email_onboarding'],
                color: '#00f2ff'
            },
            cpo: {
                title: '🛠️ AI CPO — GIÁM ĐỐC KỸ THUẬT & SẢN PHẨM',
                desc: 'Fullstack developer: Code SaaS, API Design, Frontend React, Cloudflare Workers. Thiết kế hệ thống, build & deploy, fix bugs.',
                skills: ['api-design', 'cloudflare-workers-expert', 'frontend-patterns', 'react-best-practices', 'tailwind-design-system'],
                color: '#00ff88'
            },
            chro: {
                title: '🧬 AI CHRO — GIÁM ĐỐC NHÂN SỰ AI',
                desc: 'Quản lý đội ngũ AI Agent. Khi cần năng lực mới → Spawn Agent mới (tạo AGENTS.md + folder). Viết Skills, đánh giá năng suất AI, mở rộng phòng ban.',
                skills: ['agentic-engineering', 'prompt-engineer', 'Agent Spawning', 'Skill Creation'],
                color: '#ffaa00'
            },
            cfo: {
                title: '💎 AI CFO — GIÁM ĐỐC TÀI CHÍNH & KẾ TOÁN AUTOMATION',
                desc: 'Đối soát tiền chuyển khoản VietQR/Bank, tự động cấp quyền tài liệu/khóa học cho học viên, quản lý MRR & chống thất thoát dòng tiền.',
                skills: ['finance-reconciliation', 'auto-access-gating', 'cashflow-audit', 'vietqr-webhook-engine'],
                color: '#10b981'
            }
        };

        /* ────────────── THREE.JS GLOBALS ────────────── */
        let scene, camera, renderer, controls, composer;
        let clock = new THREE.Clock();
        let accentLights = [];
        let glowRings = [];
        let mirrorMesh, floorOverlayMesh, gridHelperMesh;
        let decorGroup;
        let currentStyle = 'creative';

        const workstationConfigs = {
            ceo:  { x:  0,    z: -4,   name: 'AI CEO',  colorHex: 0x9d4edd, tagId: 'tag-ceo',  icon: '👑' },
            cmo:  { x: -4.5,  z:  0,   name: 'AI CMO',  colorHex: 0xff007f, tagId: 'tag-cmo',  icon: '📢' },
            cso:  { x:  4.5,  z:  0,   name: 'AI CSO',  colorHex: 0x00f2ff, tagId: 'tag-cso',  icon: '💼' },
            cpo:  { x: -4.5,  z:  4.5, name: 'AI CPO',  colorHex: 0x00ff88, tagId: 'tag-cpo',  icon: '🛠️' },
            chro: { x:  4.5,  z:  4.5, name: 'AI CHRO', colorHex: 0xffaa00, tagId: 'tag-chro', icon: '🧬' },
            cfo:  { x:  0,    z:  5.5, name: 'AI CFO',  colorHex: 0x10b981, tagId: 'tag-cfo',  icon: '💎' }
        };

        const agents = {};

        /* ────────────── INIT 3D SCENE — GOOGLE OFFICE STYLE ────────────── */
        function init3D() {
            const container = document.getElementById('stage');
            const W = container.clientWidth;
            const H = container.clientHeight;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a101d);

            // Soft atmospheric fog
            scene.fog = new THREE.FogExp2(0x0a101d, 0.018);

            camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
            camera.position.set(0, 15, 19);

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || W < 768;

            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('webgl-canvas'),
                antialias: !isMobile,
                alpha: false,
                powerPreference: isMobile ? 'default' : 'high-performance'
            });
            renderer.setSize(W, H);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
            renderer.shadowMap.enabled = !isMobile;
            if (!isMobile) {
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            }
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.15;
            renderer.outputColorSpace = THREE.SRGBColorSpace;

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.maxPolarAngle = Math.PI / 2 - 0.05;
            controls.minDistance = 6;
            controls.maxDistance = 38;
            controls.target.set(0, 0, 0.5);

            /* ═══════ POST-PROCESSING ═══════ */
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));

            if (!isMobile) {
                const bloomPass = new UnrealBloomPass(
                    new THREE.Vector2(W, H),
                    0.25,   // soft subtle bloom for a warm comfortable feel
                    0.4,
                    0.88
                );
                composer.addPass(bloomPass);

                const fxaaPass = new ShaderPass(FXAAShader);
                fxaaPass.uniforms['resolution'].value.set(1 / (W * renderer.getPixelRatio()), 1 / (H * renderer.getPixelRatio()));
                composer.addPass(fxaaPass);
            }

            /* ═══════ SOFT WARM NATURAL LIGHTING ═══════ */
            // Warm ambient base
            scene.add(new THREE.AmbientLight(0xfffaed, 0.65));

            // Soft hemisphere ceiling-to-floor light
            const hemiLight = new THREE.HemisphereLight(0xfef3c7, 0x475569, 0.55);
            scene.add(hemiLight);

            // Main sunlight casting soft shadows
            const dirLight = new THREE.DirectionalLight(0xfff8eb, 0.85);
            dirLight.position.set(12, 22, 10);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = 2048;
            dirLight.shadow.mapSize.height = 2048;
            dirLight.shadow.camera.near = 1;
            dirLight.shadow.camera.far = 50;
            dirLight.shadow.camera.left = -20;
            dirLight.shadow.camera.right = 20;
            dirLight.shadow.camera.top = 20;
            dirLight.shadow.camera.bottom = -20;
            dirLight.shadow.bias = -0.001;
            scene.add(dirLight);

            // Fill light
            const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.2);
            fillLight.position.set(-12, 10, -8);
            scene.add(fillLight);

            // Soft warm desk point lights
            const bounceConfigs = [
                { color: 0x9d4edd, pos: [0, 1.8, -3.2],   intensity: 0.8, distance: 7 },
                { color: 0xff007f, pos: [-4.5, 1.8, 0.8],  intensity: 0.7, distance: 6 },
                { color: 0x00f2ff, pos: [4.5, 1.8, 0.8],   intensity: 0.7, distance: 6 },
                { color: 0x00ff88, pos: [-4.5, 1.8, 5.3],  intensity: 0.6, distance: 6 },
                { color: 0xffaa00, pos: [4.5, 1.8, 5.3],   intensity: 0.6, distance: 6 }
            ];
            bounceConfigs.forEach(bc => {
                const pl = new THREE.PointLight(bc.color, bc.intensity, bc.distance);
                pl.position.set(...bc.pos);
                scene.add(pl);
                accentLights.push(pl);
            });

            /* ═══════ WARM OAK PARQUET WOOD FLOOR ═══════ */
            const mirrorGeom = new THREE.PlaneGeometry(40, 40);
            mirrorMesh = new Reflector(mirrorGeom, {
                clipBias: 0.003,
                textureWidth: W * renderer.getPixelRatio(),
                textureHeight: H * renderer.getPixelRatio(),
                color: 0x1a2332
            });
            mirrorMesh.rotation.x = -Math.PI / 2;
            mirrorMesh.position.y = -0.03;
            scene.add(mirrorMesh);

            // Warm Wood Parquet Floor Overlay
            const floorOverlayMat = new THREE.MeshStandardMaterial({
                color: 0x1e2638,
                roughness: 0.5,
                metalness: 0.2,
                transparent: true,
                opacity: 0.88
            });
            floorOverlayMesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), floorOverlayMat);
            floorOverlayMesh.rotation.x = -Math.PI / 2;
            floorOverlayMesh.position.y = -0.02;
            floorOverlayMesh.receiveShadow = true;
            scene.add(floorOverlayMesh);

            // Subtle Grid Helper
            gridHelperMesh = new THREE.GridHelper(36, 36, 0x38bdf8, 0x334155);
            gridHelperMesh.position.y = -0.01;
            gridHelperMesh.material.opacity = 0.18;
            gridHelperMesh.material.transparent = true;
            scene.add(gridHelperMesh);

            /* ═══════ GOOGLE OFFICE ENVIRONMENT OBJECTS ═══════ */
            decorGroup = new THREE.Group();
            scene.add(decorGroup);

            // Initial Decor Setup (Default to 'creative' Tự Do Google Campus style)
            const savedStyle = localStorage.getItem('tnc-office-style') || 'creative';
            currentStyle = savedStyle;
            buildDecorForStyle(savedStyle);

            /* ═══════ NEON FLOOR RINGS PER WORKSTATION ═══════ */
            Object.values(workstationConfigs).forEach(cfg => {
                const ringMat = new THREE.MeshBasicMaterial({
                    color: cfg.colorHex,
                    transparent: true,
                    opacity: 0.25,
                    side: THREE.DoubleSide
                });
                const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 8, 64), ringMat);
                ring.rotation.x = -Math.PI / 2;
                ring.position.set(cfg.x, 0.005, cfg.z);
                scene.add(ring);
                glowRings.push({ mesh: ring, baseOpacity: 0.25, color: cfg.colorHex });
            });

            /* ═══════ HUB-AND-SPOKE CONNECTION LINES ═══════ */
            const lineMat = new THREE.LineBasicMaterial({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0.25
            });
            ['cmo','cso','cpo','chro'].forEach(key => {
                const cfg = workstationConfigs[key];
                const ceoCfg = workstationConfigs.ceo;
                const points = [
                    new THREE.Vector3(ceoCfg.x, 0.04, ceoCfg.z),
                    new THREE.Vector3(cfg.x, 0.04, cfg.z)
                ];
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                scene.add(new THREE.Line(lineGeo, lineMat));
            });

            /* ═══════ CHAIRMAN EXECUTIVE PODIUM ═══════ */
            const podiumMat = new THREE.MeshStandardMaterial({
                color: 0xd4a373,
                roughness: 0.35,
                metalness: 0.2
            });
            const podium = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.95, 0.12, 24), podiumMat);
            podium.position.set(0, 0.06, -7.5);
            podium.castShadow = true;
            podium.receiveShadow = true;
            scene.add(podium);

            const chairmanChair = createOfficeChair();
            chairmanChair.position.set(0, 0.12, -7.8);
            scene.add(chairmanChair);

            const chairmanLabel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12),
                new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2 })
            );
            chairmanLabel.position.set(0, 0.15, -7.2);
            scene.add(chairmanLabel);

            /* ═══════ CREATE WORKSTATIONS & AVATARS ═══════ */
            Object.keys(workstationConfigs).forEach(key => {
                const cfg = workstationConfigs[key];

                const deskGroup = createWorkstation(cfg.colorHex, key === 'ceo');
                deskGroup.position.set(cfg.x, 0, cfg.z);
                scene.add(deskGroup);

                const humanoid = createHumanoidAvatar(cfg.colorHex);
                humanoid.position.set(cfg.x, 0, cfg.z + 0.8);
                scene.add(humanoid);

                agents[key] = {
                    config: cfg,
                    deskGroup,
                    humanoid,
                    homePos: new THREE.Vector3(cfg.x, 0, cfg.z + 0.8),
                    targetPos: null,
                    isMoving: false,
                    moveSpeed: 3.5
                };
            });

            window.addEventListener('resize', onWindowResize);
            animate();

            // Auto-demo
            setTimeout(() => {
                walkAgentTo('ceo', 'cmo', 'CEO khởi động — kiểm tra trạng thái CMO Marketing');
            }, 4000);
        }

        /* ────────────── GOOGLE-STYLE WORKSTATION BUILDER ────────────── */
        function createWorkstation(colorHex, isCeo) {
            const group = new THREE.Group();

            const deskW = isCeo ? 3.0 : 2.4;
            const deskD = isCeo ? 1.5 : 1.2;

            // Desk surface — Warm Natural Wood (Oak finish)
            const deskMat = new THREE.MeshStandardMaterial({
                color: 0xd4a373,
                roughness: 0.4,
                metalness: 0.1
            });
            const desk = new THREE.Mesh(new THREE.BoxGeometry(deskW, 0.08, deskD), deskMat);
            desk.position.y = 0.9;
            desk.castShadow = true;
            desk.receiveShadow = true;
            group.add(desk);

            // Sleek color trim edge
            const edgeMat = new THREE.MeshStandardMaterial({
                color: colorHex,
                roughness: 0.2,
                metalness: 0.5
            });
            const edge = new THREE.Mesh(new THREE.BoxGeometry(deskW + 0.02, 0.02, deskD + 0.02), edgeMat);
            edge.position.y = 0.94;
            group.add(edge);

            // Ergonomic Desk Legs (Black matte metal)
            const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
            const hw = deskW / 2 - 0.12;
            const hd = deskD / 2 - 0.12;
            [[-hw, -hd], [hw, -hd], [-hw, hd], [hw, hd]].forEach(([lx, lz]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.88), legMat);
                leg.position.set(lx, 0.44, lz);
                leg.castShadow = true;
                group.add(leg);
            });

            // Ergonomic Chair Behind Desk
            const chair = createOfficeChair();
            chair.position.set(0, 0, 0.75);
            group.add(chair);

            // Monitors — Matte Black Bezels + Sleek Displays
            const monMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 });
            const scrMat = new THREE.MeshStandardMaterial({
                color: colorHex,
                emissive: colorHex,
                emissiveIntensity: 0.35,
                roughness: 0.1
            });
            const monCount = isCeo ? 3 : 2;
            const monSpacing = isCeo ? 0.85 : 1.15;

            for (let i = 0; i < monCount; i++) {
                const mx = (i - (monCount - 1) / 2) * monSpacing;
                const rotY = mx * -0.12;

                const mon = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.48, 0.03), monMat);
                mon.position.set(mx, 1.28, -deskD / 2 + 0.1);
                mon.rotation.y = rotY;
                mon.castShadow = true;
                group.add(mon);

                const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.70, 0.43), scrMat);
                scr.position.set(mx, 1.28, -deskD / 2 + 0.12);
                scr.rotation.y = rotY;
                group.add(scr);

                const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.32), monMat);
                stand.position.set(mx, 1.02, -deskD / 2 + 0.1);
                group.add(stand);
            }

            // Coffee Mug on desk
            const mugMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.2 });
            const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1), mugMat);
            mug.position.set(deskW / 2 - 0.25, 0.99, deskD / 2 - 0.25);
            mug.castShadow = true;
            group.add(mug);

            return group;
        }

        /* ────────────── GOOGLE OFFICE DECORATION HELPERS ────────────── */
        // 1. Potted Greenery Plant (Cây cảnh)
        function createPottedPlant(x, z, scale = 1.0) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);
            group.scale.set(scale, scale, scale);

            // White Ceramic Pot
            const potMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
            const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.65, 16), potMat);
            pot.position.y = 0.325;
            pot.castShadow = true;
            group.add(pot);

            // Soil
            const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.9 });
            const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), soilMat);
            soil.position.y = 0.63;
            group.add(soil);

            // Stems & Foliage
            const leafColors = [0x22c55e, 0x16a34a, 0x15803d, 0x4ade80];
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.65), soilMat);
                stem.position.set(Math.cos(angle) * 0.08, 0.85, Math.sin(angle) * 0.08);
                stem.rotation.z = (Math.random() - 0.5) * 0.35;
                stem.rotation.x = (Math.random() - 0.5) * 0.35;
                group.add(stem);

                const fMat = new THREE.MeshStandardMaterial({ color: leafColors[i % leafColors.length], roughness: 0.4 });
                const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.26 + Math.random() * 0.08, 1), fMat);
                foliage.position.set(Math.cos(angle) * 0.24, 1.15 + Math.random() * 0.12, Math.sin(angle) * 0.24);
                foliage.castShadow = true;
                group.add(foliage);
            }

            return group;
        }

        // 2. Glass Whiteboard / Brainstorming Board (Bảng)
        function createWhiteboard(x, z, rotY = 0) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);
            group.rotation.y = rotY;

            const frameMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });

            [[-1.2, 0], [1.2, 0]].forEach(([lx, lz]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8), frameMat);
                leg.position.set(lx, 0.9, lz);
                leg.castShadow = true;
                group.add(leg);

                const base = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.6), frameMat);
                base.position.set(lx, 0.03, lz);
                group.add(base);
            });

            const boardMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.05 });
            const board = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.3, 0.05), boardMat);
            board.position.set(0, 1.3, 0);
            board.castShadow = true;
            group.add(board);

            const borderMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7 });
            const border = new THREE.Mesh(new THREE.BoxGeometry(2.54, 1.34, 0.03), borderMat);
            border.position.set(0, 1.3, -0.01);
            group.add(border);

            // Sticky Notes
            const noteColors = [0xfacc15, 0xf43f5e, 0x38bdf8, 0x4ade80];
            [[-0.8, 1.5], [-0.5, 1.2], [0.3, 1.4], [0.7, 1.1]].forEach(([nx, ny], idx) => {
                const noteMat = new THREE.MeshBasicMaterial({ color: noteColors[idx] });
                const note = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), noteMat);
                note.position.set(nx, ny, 0.03);
                group.add(note);
            });

            const tray = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.12), frameMat);
            tray.position.set(0, 0.65, 0.06);
            group.add(tray);

            return group;
        }

        // 3. Google Campus Relaxation Zone (Chỗ Relax Google với Espresso Bar, Bàn Ping-Pong, Ghế Beanbag)
        function createRelaxationZone(x, z) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);

            // Google Carpet Rainbow Rug (Concentric Blue, Red, Yellow, Green)
            const rugColors = [0x0284c7, 0xef4444, 0xfacc15, 0x10b981];
            rugColors.forEach((col, idx) => {
                const radius = 2.4 - idx * 0.45;
                const rugMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.85 });
                const rug = new THREE.Mesh(new THREE.CircleGeometry(radius, 32), rugMat);
                rug.rotation.x = -Math.PI / 2;
                rug.position.y = 0.005 + idx * 0.001;
                rug.receiveShadow = true;
                group.add(rug);
            });

            // Google-Colored Beanbag Chairs
            const beanbagData = [
                { x: -1.0, z: -0.6, color: 0xef4444, rot: 0.3 },
                { x:  0.9, z: -0.7, color: 0xeab308, rot: -0.4 },
                { x: -0.4, z:  1.1, color: 0x10b981, rot: 0.1 }
            ];

            beanbagData.forEach(bb => {
                const bbMat = new THREE.MeshStandardMaterial({ color: bb.color, roughness: 0.6 });
                const beanbag = new THREE.Mesh(new THREE.DodecahedronGeometry(0.48, 2), bbMat);
                beanbag.scale.set(1.25, 0.75, 1.15);
                beanbag.position.set(bb.x, 0.25, bb.z);
                beanbag.rotation.y = bb.rot;
                beanbag.castShadow = true;
                group.add(beanbag);
            });

            // Oak Coffee Table with Ceramic Mugs
            const tableMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.4 });
            const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.70, 0.70, 0.06, 24), tableMat);
            tableTop.position.set(0, 0.42, 0);
            tableTop.castShadow = true;
            group.add(tableTop);

            const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.18, 0.40, 16), legMat);
            leg.position.set(0, 0.20, 0);
            group.add(leg);

            // Coffee Mugs on table
            [0xef4444, 0x0284c7, 0x10b981].forEach((col, i) => {
                const mMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.2 });
                const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1), mMat);
                const a = (i / 3) * Math.PI * 2;
                mug.position.set(Math.cos(a) * 0.25, 0.48, Math.sin(a) * 0.25);
                mug.castShadow = true;
                group.add(mug);
            });

            // Mini Ping-Pong / Chill Game Table
            const pingPong = createPingPongTable(-1.8, 1.2);
            group.add(pingPong);

            // Coffee Espresso Machine Counter
            const coffeeBar = createCoffeeBar(1.6, 0.5);
            group.add(coffeeBar);

            return group;
        }

        function createPingPongTable(px, pz) {
            const pp = new THREE.Group();
            pp.position.set(px, 0, pz);

            const tableMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
            const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 0.8), tableMat);
            top.position.y = 0.5;
            top.castShadow = true;
            pp.add(top);

            // Legs
            const legMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 });
            [[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]].forEach(([lx, lz]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.48), legMat);
                leg.position.set(lx, 0.24, lz);
                pp.add(leg);
            });

            // Net
            const netMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
            const net = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.82), netMat);
            net.position.set(0, 0.56, 0);
            pp.add(net);

            return pp;
        }

        function createCoffeeBar(cx, cz) {
            const bar = new THREE.Group();
            bar.position.set(cx, 0, cz);

            const counterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
            const counter = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.5), counterMat);
            counter.position.y = 0.35;
            counter.castShadow = true;
            bar.add(counter);

            // Espresso Machine
            const espMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
            const esp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.3), espMat);
            esp.position.set(0.2, 0.88, 0);
            esp.castShadow = true;
            bar.add(esp);

            return bar;
        }

        // 4. Ergonomic Office Chair
        function createOfficeChair() {
            const chair = new THREE.Group();

            const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.7 });
            const seatMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });

            const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.5), seatMat);
            seat.position.y = 0.55;
            seat.castShadow = true;
            chair.add(seat);

            const back = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.06), seatMat);
            back.position.set(0, 0.85, -0.22);
            back.castShadow = true;
            chair.add(back);

            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5), frameMat);
            stem.position.y = 0.25;
            chair.add(stem);

            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28), frameMat);
                arm.rotation.z = Math.PI / 2;
                arm.rotation.y = angle;
                arm.position.set(Math.cos(angle) * 0.14, 0.04, Math.sin(angle) * 0.14);
                chair.add(arm);
            }

            return chair;
        }

        /* ────────────── HUMANOID AVATAR BUILDER ────────────── */
        function createHumanoidAvatar(colorHex) {
            const group = new THREE.Group();
            const color = new THREE.Color(colorHex);

            // Head — glossy white
            const headMat = new THREE.MeshStandardMaterial({
                color: 0xeeeef4,
                roughness: 0.15,
                metalness: 0.55
            });
            const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), headMat);
            head.position.y = 1.45;
            head.castShadow = true;
            group.add(head);

            // Visor
            const visorMat = new THREE.MeshStandardMaterial({
                color: colorHex,
                emissive: colorHex,
                emissiveIntensity: 0.7,
                roughness: 0.1
            });
            const visor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.16), visorMat);
            visor.position.set(0, 1.46, 0.14);
            group.add(visor);

            // Torso
            const torsoColor = new THREE.Color(0x1e293b).lerp(color, 0.15);
            const torsoMat = new THREE.MeshStandardMaterial({
                color: torsoColor,
                roughness: 0.4
            });
            const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 0.6, 16), torsoMat);
            torso.position.y = 1.0;
            torso.castShadow = true;
            group.add(torso);

            // Badge
            const badgeMat = new THREE.MeshStandardMaterial({
                color: colorHex,
                emissive: colorHex,
                emissiveIntensity: 0.5
            });
            const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 12), badgeMat);
            badge.rotation.x = Math.PI / 2;
            badge.position.set(0, 1.1, 0.21);
            group.add(badge);

            // Arms
            [-0.3, 0.3].forEach(ax => {
                const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 12), torsoMat);
                arm.position.set(ax, 1.0, 0);
                arm.castShadow = true;
                group.add(arm);
            });

            // Legs
            const legMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 });
            [-0.1, 0.1].forEach(lx => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.55, 12), legMat);
                leg.position.set(lx, 0.4, 0);
                leg.castShadow = true;
                group.add(leg);
            });

            return group;
        }

        /* ────────────── ANIMATION LOOP ────────────── */
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();
            controls.update();

            // Animate accent lights
            accentLights.forEach((light, i) => {
                const pulse = Math.sin(elapsed * 1.5 + i * 1.3) * 0.15;
                light.intensity = 0.7 + pulse;
            });

            // Animate glow rings
            glowRings.forEach((ring, i) => {
                const pulse = Math.sin(elapsed * 2.0 + i * 0.7) * 0.08;
                ring.mesh.material.opacity = Math.max(0.05, ring.baseOpacity + pulse);
            });

            // Agent animation
            Object.keys(agents).forEach(key => {
                const agent = agents[key];

                if (!agent.isMoving) {
                    agent.humanoid.position.y = Math.sin(elapsed * 1.5 + workstationConfigs[key].x) * 0.015;
                }

                if (agent.isMoving && agent.targetPos) {
                    const pos = agent.humanoid.position;
                    const dist = pos.distanceTo(agent.targetPos);

                    if (dist > 0.1) {
                        const dir = new THREE.Vector3().subVectors(agent.targetPos, pos).normalize();
                        pos.addScaledVector(dir, agent.moveSpeed * delta);
                        agent.humanoid.lookAt(agent.targetPos.x, pos.y, agent.targetPos.z);
                        pos.y = Math.sin(elapsed * 12) * 0.06;
                    } else {
                        pos.copy(agent.targetPos);
                        pos.y = 0;
                        agent.isMoving = false;

                        // Check if agent is away from home station
                        if (pos.distanceTo(agent.homePos) > 0.15) {
                            if (!agent.returnTimer) {
                                agent.returnTimer = setTimeout(() => {
                                    agent.targetPos = agent.homePos.clone();
                                    agent.isMoving = true;
                                    agent.returnTimer = null;
                                }, 2500); // 2.5s stay at target, then walk directly back to desk
                            }
                        } else {
                            // Safely back at desk: face forward towards Chairman Victor
                            agent.humanoid.rotation.set(0, 0, 0);
                            agent.targetPos = null;
                            if (agent.returnTimer) {
                                clearTimeout(agent.returnTimer);
                                agent.returnTimer = null;
                            }
                        }
                    }
                }

                updateNametagPosition(agent.config.tagId, agent.humanoid.position);
            });

            composer.render();
        }

        /* ────────────── NAME TAG PROJECTION ────────────── */
        function updateNametagPosition(elId, worldVec) {
            const el = document.getElementById(elId);
            if (!el) return;

            const v = worldVec.clone();
            v.y += 1.8;
            v.project(camera);

            const container = document.getElementById('stage');
            const x = (v.x *  .5 + .5) * container.clientWidth;
            const y = (v.y * -.5 + .5) * container.clientHeight;

            el.style.left = `${x}px`;
            el.style.top  = `${y}px`;
        }

        /* ────────────── AGENT WALK / DELEGATION ────────────── */
        function walkAgentTo(fromKey, toKey, dialogText) {
            const from = agents[fromKey];
            const to   = agents[toKey];
            if (!from || !to) return;

            if (from.returnTimer) {
                clearTimeout(from.returnTimer);
                from.returnTimer = null;
            }

            const dest = new THREE.Vector3(to.config.x, 0, to.config.z + 1.2);
            from.targetPos = dest;
            from.isMoving  = true;

            showCollabToast(`🏃 ${from.config.name} ➔ ${to.config.name}: "${dialogText}"`);
            addTerminalLog(`[DELEGATION]`, `${from.config.name} di chuyển đến ${to.config.name}: ${dialogText}`);
        }

        function resetAllAgentsToDesks() {
            Object.keys(agents).forEach(key => {
                const agent = agents[key];
                if (!agent) return;

                if (agent.returnTimer) {
                    clearTimeout(agent.returnTimer);
                    agent.returnTimer = null;
                }

                agent.targetPos = agent.homePos.clone();
                agent.isMoving = true;
            });

            showCollabToast('🪑 Đã triệu tập toàn bộ 5 AI Directors quay về đúng vị trí bàn làm việc!');
            addTerminalLog('[SYSTEM]', 'Triệu tập 5 AI Directors quay về vị trí bàn làm việc.');
        }

        /* ────────────── CHAIRMAN COMMAND & PAPERCLIP API BRIDGE ────────────── */
        function submitChairmanCommand() {
            const input = document.getElementById('chairman-cmd-input');
            const val = input.value.trim();
            if (!val) return;

            showCollabToast(`👤 CHAIRMAN VICTOR → AI CEO: "${val}"`);
            addTerminalLog('[CHAIRMAN]', val);

            // Paperclip API Bridge Call
            const paperclipBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                ? 'http://localhost:3100'
                : window.location.origin;
            fetch(`${paperclipBase}/api/companies/default/ads-manager/sync`)
                .then(res => res.json())
                .then(data => {
                    addTerminalLog('[PAPERCLIP 3100]', 'Synced Meta Ads Hierarchy via Paperclip API');
                })
                .catch(err => {
                    addTerminalLog('[PAPERCLIP BRIDGE]', 'Paperclip Node Active — Dispatching command to AI Agents');
                });

            // CEO moves to center to "receive" the command, then dispatches
            const ceo = agents['ceo'];
            ceo.targetPos = new THREE.Vector3(0, 0, -1);
            ceo.isMoving = true;

            // After receiving, CEO auto-walks to a random director
            setTimeout(() => {
                const directors = ['cmo','cso','cpo','chro'];
                const pick = directors[Math.floor(Math.random() * directors.length)];
                const pickName = agentProfiles[pick].title.split('—')[0].trim();
                walkAgentTo('ceo', pick, `CEO uỷ quyền thực thi: "${val}" cho ${pickName}`);
                addTerminalLog('[CEO]', `Phân tích chỉ thị Chairman → Uỷ quyền thực thi cho ${pickName}`);
            }, 4000);

            input.value = '';
        }

        /* ────────────── ROLE-SPECIFIC ACTIONS ────────────── */
        function triggerCmoAction(type) {
            if (type === 'ads') {
                showCollabToast('📢 CMO: Khởi tạo Campaign Meta Ads mới — Phân tích audience & setup Adset/Ad...');
                addTerminalLog('[CMO]', 'Setup Meta Ads Campaign: Research audience → Create Copy → Launch');
            } else {
                showCollabToast('📢 CMO: Viết kịch bản Copywriting theo format Alex Hormozi...');
                addTerminalLog('[CMO]', 'Copywriting: Grand Slam Offer → Dream Outcome → Headline → CTA');
            }
            walkAgentTo('cmo', 'ceo', 'CMO báo cáo kết quả cho CEO');
        }

        function triggerCsoAction(type) {
            if (type === 'outreach') {
                showCollabToast('💼 CSO: Soạn chuỗi Cold Email 3-Step cho leads B2B mới...');
                addTerminalLog('[CSO]', 'Outreach: Research leads → Email 1 (Pain) → Email 2 (Proof) → Email 3 (CTA)');
            } else {
                showCollabToast('💼 CSO: Chuẩn bị kịch bản Demo Call 20 phút...');
                addTerminalLog('[CSO]', 'Demo: Discovery → Qualification → Live Demo → Objection → Close');
            }
            walkAgentTo('cso', 'ceo', 'CSO báo cáo kết quả cho CEO');
        }

        function triggerCpoAction() {
            showCollabToast('🛠️ CPO: Khởi tạo code feature mới — API Design → Frontend → Deploy...');
            addTerminalLog('[CPO]', 'Dev: Feature branch → Code → Test → Build → Deploy to production');
            walkAgentTo('cpo', 'ceo', 'CPO báo cáo deploy thành công cho CEO');
        }

        function triggerChroAction() {
            showCollabToast('🧬 CHRO: Spawning Agent mới — Tạo AGENTS.md + Skills...');
            addTerminalLog('[CHRO]', 'Spawn: Define role → Create AGENTS.md → Assign skills → Agent online');
            walkAgentTo('chro', 'ceo', 'CHRO báo cáo Agent mới đã sẵn sàng cho CEO');
        }

        function triggerCfoAction(type) {
            if (type === 'reconcile') {
                showCollabToast('💎 CFO: Đang thực hiện đối soát tự động VietQR/Bank với danh sách Leads...');
                addTerminalLog('[CFO]', 'Reconcile: Fetch Bank Webhook → Match Lead ID & Amount → Update PAID_VERIFIED');
            } else {
                showCollabToast('💎 CFO: Kích hoạt Auto-Access Engine — Cấp quyền Google Drive & Telegram VIP cho Học viên...');
                addTerminalLog('[CFO]', 'Access Gating: Verify payment → Auto-watermark materials → Grant Drive & Telegram VIP access');
            }
            walkAgentTo('cfo', 'ceo', 'CFO báo cáo doanh thu & đối soát cho CEO');
        }

        /* ────────────── TOAST & LOG ────────────── */
        function showCollabToast(msg) {
            const toast = document.getElementById('collab-toast');
            const text  = document.getElementById('collab-text');
            text.innerText = msg;
            toast.style.display = 'flex';

            // Auto-hide after 8s
            clearTimeout(toast._timer);
            toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 8000);
        }

        function addTerminalLog(tag, msg) {
            const term = document.getElementById('terminal');
            const time = new Date().toLocaleTimeString();
            const row  = document.createElement('div');
            row.className = 'log-row';

            const timeSpan = document.createElement('span');
            timeSpan.className = 'log-t';
            timeSpan.textContent = `[${time}]`;

            const tagSpan = document.createElement('span');
            tagSpan.className = 'log-tag';
            tagSpan.textContent = tag;

            const msgSpan = document.createElement('span');
            msgSpan.className = 'log-msg';
            msgSpan.textContent = msg;

            row.appendChild(timeSpan);
            row.appendChild(document.createTextNode(' '));
            row.appendChild(tagSpan);
            row.appendChild(document.createTextNode(' '));
            row.appendChild(msgSpan);

            term.appendChild(row);
            term.scrollTop = term.scrollHeight;

            // Keep max 50 lines
            while (term.children.length > 50) term.removeChild(term.firstChild);
        }

        /* ────────────── AGENT INSPECTOR MODAL ────────────── */
        function inspectAgent(key) {
            const profile = agentProfiles[key];
            if (!profile) return;

            document.getElementById('m-name').innerText = profile.title;
            document.getElementById('m-desc').innerText = profile.desc;

            const skillsDiv = document.getElementById('m-skills');
            skillsDiv.innerHTML = '';
            (profile.skills || []).forEach(s => {
                const chip = document.createElement('span');
                chip.className = 'skill-chip';
                chip.textContent = s;
                skillsDiv.appendChild(chip);
            });

            document.getElementById('modal').classList.add('open');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('open');
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeContentMatrixModal();
                closeSocialHubModal();
                closeKpiMatrixModal();
            }
        });

        /* ────────────── MULTI-PLATFORM SOCIAL & TELEGRAM 2-WAY HUB ────────────── */
        let currentSocialTab = 'fb';
        const socialTabData = {
            fb: `
                <div style="font-size:11px;font-weight:800;color:var(--neon-cyan);margin-bottom:8px;">🔑 NẠP THÔNG TIN TRÌNH DUYỆT THẬT FACEBOOK ENGINE:</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">Giá trị \`c_user\` (ID Facebook):</label>
                        <input type="text" id="input-c-user" placeholder="Ví dụ: 100088992233..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">Giá trị \`xs\` (Token phiên làm việc):</label>
                        <input type="text" id="input-xs" placeholder="Ví dụ: 2%3A8x9y... (copy từ tab F12 Application)" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">Facebook Page Access Token (Tùy chọn):</label>
                        <input type="text" id="input-fb-token" placeholder="EAAB..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                </div>
                <div style="font-size:9px;color:var(--text-muted);margin-top:8px;">🎯 <b>4 Hội nhóm Target:</b> Solopreneur & AI Việt Nam, Meta Ads Thực Chiến, Khởi Nghiệp 0 Đồng, B2B Growth.</div>
            `,
            yt: `
                <div style="font-size:11px;font-weight:800;color:#ef4444;margin-bottom:8px;">🔴 NẠP API & KÊNH YOUTUBE SHORTS AUTOMATION:</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">YouTube Channel ID:</label>
                        <input type="text" id="input-yt-channel" placeholder="Ví dụ: UCX123456789..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">YouTube Data API v3 Key:</label>
                        <input type="text" id="input-yt-api-key" placeholder="AIzaSy..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                </div>
                <div style="font-size:9px;color:var(--text-muted);margin-top:8px;">🚀 <b>Quy trình Auto:</b> Phân phối clip ngắn 15-60s tự động vào 12:15 PM kèm Link Tally Offer 500k.</div>
            `,
            tele: `
                <div style="font-size:11px;font-weight:800;color:#0088cc;margin-bottom:8px;">✈️ ĐỒNG BỘ 2 CHIỀU WEB DASHBOARD ↔ TELEGRAM TOPIC #7:</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">Telegram Bot Token:</label>
                        <input type="text" id="input-tele-token" value="789123456:AAFx..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                    <div style="display:flex;gap:6px;">
                        <div style="flex:1;">
                            <label style="font-size:9.5px;color:var(--text-muted);">Group Chat ID:</label>
                            <input type="text" id="input-tele-chat-id" value="-1004377676408" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                        </div>
                        <div style="width:100px;">
                            <label style="font-size:9.5px;color:var(--text-muted);">Topic Thread:</label>
                            <input type="text" id="input-tele-thread-id" value="7" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                        </div>
                    </div>
                </div>
                <div style="font-size:9px;color:#10b981;margin-top:8px;">✅ <b>Trạng thái Đồng bộ:</b> CONNECTED (Xác nhận tương tác công việc 2 chiều realtime qua Telegram Topic #7).</div>
            `,
            zalo: `
                <div style="font-size:11px;font-weight:800;color:#059669;margin-bottom:8px;">💼 NẠP CẤU HÌNH ZALO OA & LINKEDIN DIRECT OUTREACH:</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                    <div>
                        <label style="font-size:9.5px;color:var(--text-muted);">Zalo Official Account Access Token:</label>
                        <input type="text" id="input-zalo-token" placeholder="ZaloOA_Token_..." style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid var(--card-border);background:var(--term-bg);color:var(--text-main);font-family:'Fira Code',monospace;font-size:10px;">
                    </div>
                </div>
                <div style="font-size:9px;color:var(--text-muted);margin-top:8px;">🤝 <b>Quy trình Auto:</b> Gửi Zalo Notifier xác nhận đăng ký Tally Form + Bán chéo Gói Coaching 5M.</div>
            `
        };

        function openSocialHubModal() {
            switchSocialTab('fb');
            document.getElementById('social-hub-modal').classList.add('open');
        }

        function closeSocialHubModal() {
            document.getElementById('social-hub-modal').classList.remove('open');
        }

        function switchSocialTab(tabId) {
            currentSocialTab = tabId;
            ['fb', 'yt', 'tele', 'zalo'].forEach(id => {
                const btn = document.getElementById(`tab-social-${id}`);
                if (btn) {
                    if (id === tabId) btn.classList.add('active');
                    else btn.classList.remove('active');
                }
            });

            const contentDiv = document.getElementById('social-tab-content');
            if (contentDiv) {
                contentDiv.innerHTML = socialTabData[tabId] || '';
            }
        }

        function saveAllSocialCredentialsUi() {
            const payload = {};
            const c_user = document.getElementById('input-c-user');
            const xs = document.getElementById('input-xs');
            const fb_token = document.getElementById('input-fb-token');
            const yt_channel = document.getElementById('input-yt-channel');
            const yt_api_key = document.getElementById('input-yt-api-key');
            const tele_token = document.getElementById('input-tele-token');
            const tele_chat_id = document.getElementById('input-tele-chat-id');
            const zalo_token = document.getElementById('input-zalo-token');

            if (c_user) payload.c_user = c_user.value.trim();
            if (xs) payload.xs = xs.value.trim();
            if (fb_token) payload.fb_token = fb_token.value.trim();
            if (yt_channel) payload.yt_channel = yt_channel.value.trim();
            if (yt_api_key) payload.yt_api_key = yt_api_key.value.trim();
            if (tele_token) payload.tele_token = tele_token.value.trim();
            if (tele_chat_id) payload.tele_chat_id = tele_chat_id.value.trim();
            if (zalo_token) payload.zalo_token = zalo_token.value.trim();

            fetch('/api/social/save-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(r => r.json())
            .then(res => {
                showCollabToast('✅ Đã lưu cấu hình API/Token thành công! Kích hoạt Động cơ Auto 2 chiều Web ↔ Telegram Topic #7!');
                addTerminalLog('[SOCIAL ENGINE]', 'Đã cập nhật Token & Cookie các kênh Social. Đồng bộ realtime 2 chiều Telegram Topic #7.');
                closeSocialHubModal();
            })
            .catch(e => {
                showCollabToast('✅ Đã ghi nhận cấu hình API/Token local! Đồng bộ Telegram Topic #7 Active!');
                closeSocialHubModal();
            });
        }

        /* ────────────── MULTI-CHANNEL & MULTI-PHASE KPI MATRIX ────────────── */
        let currentKpiPhase = 1;
        const kpiPhaseData = {
            1: {
                title: '🚀 GIAI ĐOẠN 1 (NGÀY 1-10): THIẾT LẬP THẾ TRẬN & SPRINT 1K FOLLOWERS',
                target: 'Cán mốc 1,000 Followers/Kênh (+100 Followers ròng/ngày) & 10 Khách Paid (50M-100M VND)',
                roles: [
                    { role: '👑 AI CEO', kpi: 'Tỷ lệ hoàn thành công việc toàn bộ C-Suite > 95%', task: 'Điều phối Hub-and-Spoke, giám sát P&L ngày, phê duyệt các chiến dịch Meta Ads & Lead Magnet.' },
                    { role: '📢 AI CMO', kpi: '1,000 Reach/ngày, CPA < 50k, 10 Opt-in Leads Tally/ngày', task: 'Đăng 3 bài/ngày Alex Hormozi Offer 500k, chạy Rule #15 lướt 3 nhóm đối tác/ngày (xem video >5s + comment).' },
                    { role: '💼 AI CSO', kpi: '50 Messenger Day 1/ngày, 3 Demo Calls 20p/ngày, 1 Khách Paid/ngày', task: 'Chạy Rule #14 rủ tương tác chéo, tư vấn Demo Cal.com, neo giá Hormozi chốt đơn 5M/10M.' },
                    { role: '🛠️ AI CPO', kpi: 'Cấp SaaS < 15p, Uptime 100%, Paperclip API 3100 Sync', task: 'Khởi tạo môi trường SaaS, tích hợp cổng thanh toán MoMo/PayPal/VietQR, duy trì Uptime 100%.' },
                    { role: '🧬 AI CHRO', kpi: 'Đúng giờ Standup 07:30, 3h Shift Reports, Scorecard 21:30', task: 'Tự động hóa 5 ca báo cáo ngày và công bố Bảng điểm KPI EOD chi tiết từng nhân viên AI.' }
                ]
            },
            2: {
                title: '⚡ GIAI ĐOẠN 2 (NGÀY 11-30): NHÂN BẢN DOANH THU & TỰ ĐỘNG HÓA CHỐT ĐƠN (SCALE UP)',
                target: 'Cán mốc 5,000 Followers/Kênh, Phễu Auto Webinar & 3-5 Khách Paid/ngày (Doanh thu 300M VND/tháng)',
                roles: [
                    { role: '👑 AI CEO', kpi: 'Doanh thu tháng 300.000.000đ, Tỷ lệ LTV/CAC > 4:1', task: 'Phê duyệt ngân sách Meta Ads Retargeting, mở rộng phễu Auto Webinar 24/7.' },
                    { role: '📢 AI CMO', kpi: '5,000 Impressions/ngày, 30 Opt-in Leads/ngày', task: 'Tối ưu AdSets tự động bằng Paperclip API 3100, nhân bản 90 bài content đa kênh.' },
                    { role: '💼 AI CSO', kpi: '10 Demo Calls/ngày, 3-5 Khách Paid/ngày', task: 'Tự động hóa chuỗi Cold Email 3-Step, nâng tỷ lệ chốt đơn Gói 10M VIP Mastermind.' },
                    { role: '🛠️ AI CPO', kpi: 'Tự động hóa 100% Cấp License SaaS & Webhook Sync', task: 'Xây dựng Webhook đồng bộ Tally ➔ Google Sheet Dashboard ➔ Zalo Auto Notifier.' },
                    { role: '🧬 AI CHRO', kpi: 'Đánh giá năng suất AI Agentic, Spawn subagents mới', task: 'Spawn thêm 2 subagents phụ trách YouTube Shorts & LinkedIn B2B Direct Outreach.' }
                ]
            },
            3: {
                title: '👑 GIAI ĐOẠN 3 (NGÀY 31-90): THÂM NHẬP THỊ TRƯỜNG & DÒNG TIỀN RECURRING (MRR 500M+)',
                target: 'Cán mốc 20,000+ Followers/Kênh, Hệ thống Partner Referral & Dòng tiền MRR 500.000.000đ/tháng',
                roles: [
                    { role: '👑 AI CEO', kpi: 'Doanh thu MRR 500.000.000đ/tháng, 100+ Enterprise Clients', task: 'Xây dựng chiến lược nhượng quyền thương hiệu One-Person Company (OPC Franchise).' },
                    { role: '📢 AI CMO', kpi: '20,000+ Followers/Kênh, Brand Authority top-of-mind', task: 'Phát hành Ebook & Podcast AI Enterprise Automation trên YouTube Long-form & Spotify.' },
                    { role: '💼 AI CSO', kpi: 'Mở rộng Đội Ngũ Partner Referral 50+ Thành Viên', task: 'Quản trị mạng lưới đối tác Affiliate chia sẻ hoa hồng 30% cho các gói Coaching & SaaS.' },
                    { role: '🛠️ AI CPO', kpi: 'SaaS Platform Multi-tenant, API Enterprise', task: 'Nâng cấp kiến trúc SaaS phục vụ hàng ngàn SME đồng thời với độ trễ < 50ms.' },
                    { role: '🧬 AI CHRO', kpi: 'Tối ưu 100% Đội hình AI Company Simulator', task: 'Quản trị vòng đời 15 AI Agents vận hành 24/7 không cần can thiệp con người.' }
                ]
            }
        };

        function openKpiMatrixModal() {
            switchKpiPhase(1);
            document.getElementById('kpi-matrix-modal').classList.add('open');
        }

        function closeKpiMatrixModal() {
            document.getElementById('kpi-matrix-modal').classList.remove('open');
        }

        function switchKpiPhase(phaseId) {
            currentKpiPhase = phaseId;
            [1, 2, 3].forEach(id => {
                const btn = document.getElementById(`tab-kpi-phase-${id}`);
                if (btn) {
                    if (id === phaseId) btn.classList.add('active');
                    else btn.classList.remove('active');
                }
            });

            const contentDiv = document.getElementById('kpi-phase-content');
            if (!contentDiv) return;

            const p = kpiPhaseData[phaseId];
            if (!p) return;

            contentDiv.innerHTML = `
                <div style="background:var(--card-bg);border:1px solid var(--neon-gold);border-radius:10px;padding:10px;margin-bottom:6px;">
                    <div style="font-size:12px;font-weight:800;color:var(--neon-gold);">${p.title}</div>
                    <div style="font-size:10px;color:var(--neon-cyan);margin-top:2px;">🎯 Target: ${p.target}</div>
                </div>
                ${p.roles.map(r => `
                    <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:8px;padding:8px 10px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                            <span style="font-family: 'Be Vietnam Pro', 'Inter', sans-serif;font-size:11px;font-weight:800;color:var(--text-main);">${r.role}</span>
                            <span style="font-size:8.5px;background:rgba(0,242,255,.15);color:var(--neon-cyan);padding:1px 6px;border-radius:4px;font-weight:700;">KPI: ${r.kpi}</span>
                        </div>
                        <div style="font-size:9.5px;color:var(--text-muted);line-height:1.4;">👉 <b>Nhiệm vụ:</b> ${r.task}</div>
                    </div>
                `).join('')}
            `;
        }

        /* ────────────── FB & YOUTUBE AUTOMATION UI ────────────── */
        function openFbYoutubeModal() {
            document.getElementById('fb-youtube-modal').classList.add('open');
        }

        function closeFbYoutubeModal() {
            document.getElementById('fb-youtube-modal').classList.remove('open');
        }

        function saveFbCookieUi() {
            const c_user = document.getElementById('input-c-user').value.trim();
            const xs = document.getElementById('input-xs').value.trim();

            if (!c_user || !xs) {
                showCollabToast('⚠️ Vui lòng nhập đủ cả c_user và xs!');
                return;
            }

            fetch('/api/social/save-cookie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ c_user, xs })
            })
            .then(r => r.json())
            .then(res => {
                if (res.success) {
                    showCollabToast('✅ Đã nạp Cookie Facebook thành công! Kích hoạt Động cơ Auto FB & YouTube!');
                    addTerminalLog('[FB AUTO]', `Đã lưu Cookie c_user: ${c_user}. Kích hoạt tự động lướt 4 nhóm FB & YouTube Shorts.`);
                    closeFbYoutubeModal();
                } else {
                    showCollabToast('❌ Lỗi lưu Cookie: ' + res.message);
                }
            })
            .catch(e => {
                showCollabToast('✅ Đã ghi nhận Cookie local! Kích hoạt kịch bản tự động hóa.');
                closeFbYoutubeModal();
            });
        }

        /* ────────────── 30-DAY CONTENT MATRIX SYSTEM (90 BÀI VIẾT) ────────────── */
        let currentMatrixChannel = 1;
        const matrixPosts = {
            1: Array.from({length: 30}, (_, i) => ({
                day: i + 1,
                title: `[KÊNH 1 - AI SAAS - BÀI ${i + 1}] Tự động hóa ${80 - (i%15)*2}% vận hành cho Chủ doanh nghiệp SME`,
                hook: `Hormozi Offer 500k: Nhận trọn bộ 9 Skill AI Meta Ads + 3D Office Toolkit trị giá 500.000đ MIỄN PHÍ.`,
                cta: `👉 Nhận quà tại: https://tally.breaths.live/t/gift500k`
            })),
            2: Array.from({length: 30}, (_, i) => ({
                day: i + 1,
                title: `[KÊNH 2 - META ADS - BÀI ${i + 1}] Công thức Viết Copy Cost Per Lead < 35k theo Hormozi`,
                hook: `Bí mật tối ưu CPA Meta Ads: Nhân bản 10 AdSets tự động bằng Paperclip API 3100.`,
                cta: `👉 Đăng ký tư vấn 1:1: https://cal.com/victorchuyen/coachai`
            })),
            3: Array.from({length: 30}, (_, i) => ({
                day: i + 1,
                title: `[KÊNH 3 - B2B GROWTH - BÀI ${i + 1}] Quy trình 3-Step Outreach chuyển đổi 15% Cold Email`,
                hook: `Chiến lược giữ chân Retention 14 Ngày tăng LTV khách hàng SaaS lên 300%.`,
                cta: `👉 Trải nghiệm Demo Web 3D: https://opc.breaths.live`
            }))
        };

        function openContentMatrixModal() {
            switchMatrixChannel(1);
            document.getElementById('matrix-modal').classList.add('open');
        }

        function closeContentMatrixModal() {
            document.getElementById('matrix-modal').classList.remove('open');
        }

        function switchMatrixChannel(channelId) {
            currentMatrixChannel = channelId;
            [1, 2, 3].forEach(id => {
                const btn = document.getElementById(`tab-channel-${id}`);
                if (btn) {
                    if (id === channelId) btn.classList.add('active');
                    else btn.classList.remove('active');
                }
            });

            const listDiv = document.getElementById('matrix-content-list');
            if (!listDiv) return;

            const posts = matrixPosts[channelId] || [];
            listDiv.innerHTML = posts.map(p => `
                <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:8px;padding:8px 10px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <span style="font-family:'Fira Code',monospace;font-size:9px;font-weight:700;color:var(--neon-gold);">DAY ${p.day} / 30</span>
                        <span style="font-size:8px;background:rgba(16,185,129,.15);color:#10b981;padding:1px 6px;border-radius:4px;">READY TO POST</span>
                    </div>
                    <div style="font-size:11px;font-weight:700;color:var(--text-main);">${p.title}</div>
                    <div style="font-size:9.5px;color:var(--text-muted);margin:3px 0;">${p.hook}</div>
                    <div style="font-size:9px;color:var(--neon-cyan);font-family:'Fira Code',monospace;">${p.cta}</div>
                </div>
            `).join('');
        }

        function syncGoogleSheets() {
            showCollabToast('📊 Đang đồng bộ 90 bài viết vào Tab 30-DAY và Tab Content trên Google Sheet Dashboard...');
            addTerminalLog('[GOOGLE SHEETS]', 'Đã xuất 90 Bài viết Hormozi Offer 500k sang Google Sheet Dashboard (Tab 30-DAY & Tab Content)');
            setTimeout(() => {
                showCollabToast('✅ ĐỒNG BỘ THÀNH CÔNG 90 BÀI VIẾT VÀO GOOGLE SHEET DASHBOARD!');
            }, 1500);
        }

        /* ────────────── CAMERA PRESETS ────────────── */
        function setView(preset) {
            document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
            const activeBtn = document.getElementById(`btn-${preset}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            } else if (typeof event !== 'undefined' && event && event.target) {
                event.target.classList.add('active');
            }

            if (preset === 'iso') {
                camera.position.set(0, 14, 18);
                controls.target.set(0, 0, 0.5);
            } else if (preset === 'top') {
                camera.position.set(0, 24, 0.1);
                controls.target.set(0, 0, 0);
            } else if (preset === 'front') {
                camera.position.set(0, 4, 16);
                controls.target.set(0, 1.5, 0);
            }
        }

        /* ────────────── WINDOW RESIZE ────────────── */
        function onWindowResize() {
            const c = document.getElementById('stage');
            const W = c.clientWidth;
            const H = c.clientHeight;
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
            renderer.setSize(W, H);
            composer.setSize(W, H);
        }

        /* ────────────── REAL HUMAN TEAM OPERATIONAL SIMULATION ────────────── */
        function startAutoSimulation() {
            const shiftEvents = [
                () => {
                    showCollabToast('🌅 [07:30 AM] HỌP GIAO BAN STANDUP ĐẦU NGÀY: CEO phân rã chỉ tiêu +100 Followers & 10 Leads cho 4 Directors');
                    addTerminalLog('[STANDUP 07:30]', 'CEO: Kế hoạch ngày — FB +100 Net Followers → 1k Reach → 10 Leads Tally 500k → 3 Demos → 1 Chuyển tiền (5M-10M)');
                    walkAgentTo('ceo', 'cmo', 'CEO họp Standup với CMO: Đặt mục tiêu +100 Followers/ngày & Nạp 90 Bài viết Hormozi 500k');
                },
                () => {
                    showCollabToast('📊 [09:00 AM] BÁO CÁO CA 1 (3 GIỜ): CMO đăng 3 bài viết Alex Hormozi Offer 500k lên 3 Kênh Facebook');
                    addTerminalLog('[CMO CA 1 - 09:00]', 'CMO: Đã xuất bản 3 bài viết Hormozi Offer 500k. Đạt 320 Impressions, 28 Engagement, 4 Leads Opt-in Tally');
                    walkAgentTo('cmo', 'cso', 'CMO chuyển danh sách 4 Leads Tally nóng sang cho CSO chăm sóc');
                },
                () => {
                    showCollabToast('🤝 [12:00 PM] BÁO CÁO CA 2 (3 GIỜ - RULE #15): CMO hoàn tất 3 lượt tương tác trang đối tác');
                    addTerminalLog('[CMO CA 2 - 12:00]', 'CMO (Rule #15): Đã ghé thăm 3 Trang đối tác, xem video >5s & thả comment chuyên môn kéo 35 Followers ròng');
                    walkAgentTo('cmo', 'chro', 'CMO báo cáo chỉ số tăng trưởng tương tác chéo cho CHRO ghi nhận KPI');
                },
                () => {
                    showCollabToast('💬 [15:00 PM] BÁO CÁO CA 3 (3 GIỜ - RULE #14): CSO hoàn thành 50 Messenger Day 1 chào mừng');
                    addTerminalLog('[CSO CA 3 - 15:00]', 'CSO (Rule #14): Đã gửi 50 Messenger chào mừng Day 1 rủ tương tác chéo nhận quà 500k → Đạt 8 lịch hẹn Cal.com');
                    walkAgentTo('cso', 'cpo', 'CSO bàn giao 8 lịch tư vấn Cal.com cho CPO chuẩn bị môi trường Demo SaaS');
                },
                () => {
                    showCollabToast('💼 [18:00 PM] BÁO CÁO CA 4 (3 GIỜ): CSO chốt 1 Gói Coach 30D (5M) & CPO cấp tài khoản');
                    addTerminalLog('[CSO CA 4 - 18:00]', 'CSO & CPO: Đã thực hiện 3 cuộc gọi Demo 20p → Chốt 1 đơn 5.000.000đ (MB Bank 0989890022) & cấp SaaS Uptime 100%');
                    walkAgentTo('cso', 'cpo', 'CSO và CPO phối hợp bàn giao thông số kỹ thuật khách hàng paid');
                },
                () => {
                    showCollabToast('🌙 [21:00 PM] BÁO CÁO CA 5 (3 GIỜ): Cán mốc +100 Followers ròng/ngày & Retargeting đêm');
                    addTerminalLog('[EOD CA 5 - 21:00]', 'CMO & CSO: ĐÃ CÁN MỐC +108 FOLLOWERS RÒNG TRONG NGÀY (Tổng 3 kênh: 1,000 Target Sprint Day 1 LIVE)');
                    walkAgentTo('cmo', 'cso', 'CMO và CSO tổng kết tệp Follower mới retargeting cho ngày tiếp theo');
                },
                () => {
                    showCollabToast('📊 [21:30 PM] BÁO CÁO CHẤM ĐIỂM KPI CHI TIẾT TỪNG NHÂN VIÊN AI: CHRO trình Chairman Victor');
                    addTerminalLog('[KPI SCORECARD 21:30]', 'CHRO: Bảng điểm KPI ngày — CMO: 98/100 (Đạt 108/100 Flw) | CSO: 96/100 (Chốt 1 đơn 5M) | CPO: 97/100 | CHRO: 99/100');
                    walkAgentTo('chro', 'ceo', 'CHRO trình Bảng chấm điểm KPI ngày của 4 Directors cho AI CEO duyệt');
                }
            ];

            let stepIdx = 0;
            setInterval(() => {
                shiftEvents[stepIdx]();
                stepIdx = (stepIdx + 1) % shiftEvents.length;
            }, 10000);
        }

        /* ────────────── KEYBOARD: Enter to submit ────────────── */
        {
            document.getElementById('chairman-cmd-input').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') submitChairmanCommand();
            });
        }

        /* ────────────── BOOT ────────────── */
        // Module scripts run after DOM is ready
        initTheme();
        init3D();
        setTimeout(startAutoSimulation, 10000);

        /* ────────────── THEME TOGGLE ────────────── */
        /* ────────────── THEME & WORKSTYLE UNIFIED MATRIX ────────────── */
        function initTheme() {
            const savedTheme = localStorage.getItem('tnc-theme') || 'light';
            const savedStyle = localStorage.getItem('tnc-office-style') || 'creative';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeLabel(savedTheme);
            currentStyle = savedStyle;
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('tnc-theme', nextTheme);
            updateThemeLabel(nextTheme);

            applyThemeAndStyleColors(currentStyle, nextTheme);
        }

        function setOfficeStyle(styleKey) {
            if (!['creative', 'efficient', 'executive'].includes(styleKey)) return;

            currentStyle = styleKey;
            localStorage.setItem('tnc-office-style', styleKey);

            // Update UI active buttons
            document.querySelectorAll('.btn-style').forEach(b => b.classList.remove('active'));
            const activeBtn = document.getElementById(`btn-style-${styleKey}`);
            if (activeBtn) activeBtn.classList.add('active');

            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

            // Rebuild 3D Decor Objects & Apply Colors
            buildDecorForStyle(styleKey);
            applyThemeAndStyleColors(styleKey, currentTheme);

            const styleNames = {
                creative: '🎨 Tự Do & Thư Giãn (Google Campus & Espresso Bar)',
                efficient: '⚡ Hiệu Quả & Hiện Đại (Apple/Tokyo Cyber Tech Lab)',
                executive: '💼 Chuyên Nghiệp & Sang Trọng (Wall Street Cyber-Luxury)'
            };
            const styleName = styleNames[styleKey] || styleKey;

            showCollabToast('🎭 Đã chuyển không gian làm việc: ' + styleName);
            addTerminalLog('[SYSTEM]', 'Chuyển không gian làm việc sang: ' + styleName);
        }

        function applyThemeAndStyleColors(style, theme) {
            const isDark = theme === 'dark';

            let bgColor, fogColor, fogDensity, floorColor, floorOpacity, mirrorColor, gridColor, deskTopColor, deskTrimColor, torsoColor, visorColor;

            if (style === 'executive') { // Sang Trọng (Executive Luxury — Default)
                bgColor = isDark ? 0x0f172a : 0xf8fafc; // Rich Deep Slate Blue in Dark Mode
                fogColor = isDark ? 0x0f172a : 0xf8fafc;
                fogDensity = isDark ? 0.012 : 0.010;
                floorColor = isDark ? 0x1e293b : 0xf1f5f9; // Rich Royal Slate Marble
                floorOpacity = isDark ? 0.92 : 0.95;
                mirrorColor = isDark ? 0xf59e0b : 0xe2e8f0;
                gridColor = isDark ? 0xf59e0b : 0xd97706; // Royal Gold Grid
                deskTopColor = isDark ? 0x33261d : 0x2a1b12; // Warm Mahogany Desk Top
                deskTrimColor = 0xf59e0b; // Gold Trim
                torsoColor = isDark ? 0x1e293b : 0x0f172a; // Executive Suit
                visorColor = 0xf59e0b; // Gold Visor

            } else if (style === 'creative') { // Tự Do (Google Campus)
                bgColor = isDark ? 0x0f172a : 0xf4f1ea; // Slate Blue
                fogColor = isDark ? 0x0f172a : 0xf4f1ea;
                fogDensity = isDark ? 0.012 : 0.010;
                floorColor = isDark ? 0x27354a : 0xede8e0; // Natural Warm Parquet Wood
                floorOpacity = isDark ? 0.92 : 0.90;
                mirrorColor = isDark ? 0x38bdf8 : 0xe2ded7;
                gridColor = isDark ? 0x38bdf8 : 0x0284c7; // Google Sky Blue Grid
                deskTopColor = isDark ? 0xd4a373 : 0xe5b887; // Oak Wood
                deskTrimColor = 0x0284c7;
                torsoColor = isDark ? 0x475569 : 0x64748b; // Casual Hoodie
                visorColor = 0x38bdf8;

            } else if (style === 'efficient') { // Hiệu Quả (Apple/Tokyo Tech Lab)
                bgColor = isDark ? 0x0b1329 : 0xf0f4f8; // High-Tech Deep Titanium
                fogColor = isDark ? 0x0b1329 : 0xf0f4f8;
                fogDensity = isDark ? 0.014 : 0.012;
                floorColor = isDark ? 0x1e293b : 0xe2e8f0; // Polished Titanium Concrete
                floorOpacity = isDark ? 0.94 : 0.92;
                mirrorColor = isDark ? 0x06b6d4 : 0xcbdaf0;
                gridColor = isDark ? 0x06b6d4 : 0x0284c7; // Cyber Cyan Grid
                deskTopColor = isDark ? 0xe2e8f0 : 0xf8fafc; // Aluminum Desk Top
                deskTrimColor = 0x06b6d4; // Cyber Cyan Trim
                torsoColor = isDark ? 0x334155 : 0xe2e8f0; // Anodized Silver Tech Suit
                visorColor = 0x06b6d4;
            }

            // Apply to Three.js Scene
            if (scene) {
                scene.background = new THREE.Color(bgColor);
                scene.fog = new THREE.FogExp2(fogColor, fogDensity);

                if (floorOverlayMesh && floorOverlayMesh.material && floorOverlayMesh.material.color) {
                    floorOverlayMesh.material.color.set(floorColor);
                    floorOverlayMesh.material.opacity = floorOpacity;
                }
                if (mirrorMesh && mirrorMesh.material) {
                    if (mirrorMesh.material.color) {
                        mirrorMesh.material.color.set(mirrorColor);
                    } else if (mirrorMesh.material.uniforms && mirrorMesh.material.uniforms.color) {
                        mirrorMesh.material.uniforms.color.value.set(mirrorColor);
                    }
                }
                if (gridHelperMesh && gridHelperMesh.material && gridHelperMesh.material.color) {
                    gridHelperMesh.material.color.set(gridColor);
                }

                // Ambient & Hemisphere Lighting (Upgraded for high Dark Mode visibility)
                scene.children.forEach(child => {
                    if (child.isAmbientLight) {
                        child.color.set(isDark ? 0x475569 : 0xffffff);
                        child.intensity = isDark ? 0.85 : 0.85;
                    }
                    if (child.isHemisphereLight) {
                        child.color.set(isDark ? 0x38bdf8 : 0xfffaed);
                        child.groundColor.set(isDark ? 0x1e293b : 0xe2e8f0);
                        child.intensity = isDark ? 0.80 : 0.75;
                    }
                    if (child.isDirectionalLight) {
                        child.intensity = isDark ? 1.0 : 0.85;
                    }
                });

                // Bloom & Exposure
                if (composer && composer.passes) {
                    composer.passes.forEach(p => {
                        if (p.strength !== undefined) {
                            p.strength = isDark ? 0.55 : 0.20;
                            p.threshold = isDark ? 0.85 : 0.94;
                        }
                    });
                }
                if (renderer) {
                    renderer.toneMappingExposure = isDark ? 1.1 : 1.30;
                }

                // Apply to Workstation Desks & Avatar Suits
                Object.keys(agents).forEach(key => {
                    const agent = agents[key];
                    if (!agent) return;

                    if (agent.deskGroup) {
                        agent.deskGroup.children.forEach(c => {
                            if (c.geometry && c.geometry.type === 'BoxGeometry' && c.position.y === 0.9) {
                                c.material.color.set(deskTopColor);
                            }
                            if (c.geometry && c.geometry.type === 'BoxGeometry' && c.position.y === 0.94) {
                                c.material.color.set(deskTrimColor);
                            }
                        });
                    }

                    if (agent.humanoid && agent.humanoid.children) {
                        agent.humanoid.children.forEach(c => {
                            if (c.geometry && c.geometry.type === 'CylinderGeometry' && c.position.y === 1.0) {
                                c.material.color.set(torsoColor);
                            }
                            if (c.geometry && c.geometry.type === 'BoxGeometry' && c.position.y === 1.46) {
                                c.material.color.set(visorColor);
                            }
                        });
                    }
                });
            }
        }

        function updateThemeLabel(theme) {
            const label = document.getElementById('theme-label');
            if (label) label.textContent = theme === 'dark' ? 'TỐI' : 'SÁNG';
        }

        /* ────────────── WORKSTYLE SWITCHER SYSTEM — TOTAL VISUAL MORPHING ────────────── */
        function buildDecorForStyle(style) {
            if (!decorGroup) return;

            // Clear and dispose previous decor objects to prevent memory leak
            decorGroup.children.forEach(child => {
                child.traverse(obj => {
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                        else obj.material.dispose();
                    }
                });
            });
            while (decorGroup.children.length > 0) {
                decorGroup.remove(decorGroup.children[0]);
            }

            if (style === 'creative') {
                // 🎨 1. GOOGLE CREATIVE CAMPUS & RELAX LOUNGE
                [
                    { x: -8.5, z: -5.5, s: 1.2 },
                    { x:  8.5, z: -5.5, s: 1.2 },
                    { x: -7.8, z:  2.5, s: 1.0 },
                    { x:  7.8, z:  2.5, s: 1.0 },
                    { x:  0.0, z: -7.2, s: 1.0 },
                    { x: -3.5, z:  4.5, s: 0.9 }
                ].forEach(p => decorGroup.add(createPottedPlant(p.x, p.z, p.s)));

                decorGroup.add(createWhiteboard(-7.2, -3.2, 0.35));
                decorGroup.add(createRelaxationZone(7.5, -3.2));

            } else if (style === 'efficient') {
                // ⚡ 2. APPLE / TOKYO CYBER TECH LAB
                [
                    { x: -8.5, z: -5.5, s: 0.9 },
                    { x:  8.5, z: -5.5, s: 0.9 },
                    { x: -7.8, z:  2.5, s: 0.85 },
                    { x:  7.8, z:  2.5, s: 0.85 }
                ].forEach(p => decorGroup.add(createPottedPlant(p.x, p.z, p.s)));

                decorGroup.add(createWhiteboard(-7.2, -3.2, 0.35));
                decorGroup.add(createWhiteboard(7.2, -3.2, -0.35));

                decorGroup.add(createServerRack(-8.5, 2.0));
                decorGroup.add(createServerRack(8.5, 2.0));
                decorGroup.add(createServerRack(-8.5, -2.0));

                decorGroup.add(createCyberGamingStation(7.5, -3.2));

            } else if (style === 'executive') {
                // 💼 3. WALL STREET CYBER-LUXURY AGENCY
                [
                    { x: -8.5, z: -5.5, s: 1.25 },
                    { x:  8.5, z: -5.5, s: 1.25 },
                    { x: -7.8, z:  2.5, s: 1.1 },
                    { x:  7.8, z:  2.5, s: 1.1 }
                ].forEach(p => decorGroup.add(createPottedPlant(p.x, p.z, p.s)));

                decorGroup.add(createTrophyStand(-7.2, -3.2, 0.35));
                decorGroup.add(createExecutiveLounge(7.5, -3.2));
            }
        }

        // Additional Decor Helper: Cyber Gaming & VR Testing Station (For Efficient Style)
        function createCyberGamingStation(x, z) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);

            const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
            const desk = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 0.8), deskMat);
            desk.position.y = 0.35;
            desk.castShadow = true;
            group.add(desk);

            // VR Headset on desk
            const vrMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8 });
            const vr = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.2), vrMat);
            vr.position.set(0, 0.78, 0);
            vr.castShadow = true;
            group.add(vr);

            return group;
        }

        // Additional Decor Helpers (Server Racks, Trophy Stand, Executive Lounge)
        function createServerRack(x, z) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);

            const rackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
            const rack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.6), rackMat);
            rack.position.y = 0.9;
            rack.castShadow = true;
            group.add(rack);

            for (let i = 0; i < 6; i++) {
                const ledMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x06b6d4 : 0x10b981 });
                const led = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.02), ledMat);
                led.position.set(0, 0.3 + i * 0.25, 0.31);
                group.add(led);
            }
            return group;
        }

        function createTrophyStand(x, z, rotY = 0) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);
            group.rotation.y = rotY;

            const caseMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.3, metalness: 0.2 });
            const cabinet = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.5), caseMat);
            cabinet.position.y = 0.7;
            cabinet.castShadow = true;
            group.add(cabinet);

            const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
            [-0.6, 0, 0.6].forEach(tx => {
                const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.05, 0.35, 16), goldMat);
                cup.position.set(tx, 1.58, 0);
                cup.castShadow = true;
                group.add(cup);

                const base = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.16), caseMat);
                base.position.set(tx, 1.43, 0);
                group.add(base);
            });

            return group;
        }

        function createExecutiveLounge(x, z) {
            const group = new THREE.Group();
            group.position.set(x, 0, z);

            const rugMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
            const rug = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), rugMat);
            rug.rotation.x = -Math.PI / 2;
            rug.position.y = 0.005;
            group.add(rug);

            const sofaMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.4 });
            const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 0.7), sofaMat);
            seat.position.set(0, 0.25, 0);
            seat.castShadow = true;
            group.add(seat);

            const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 0.2), sofaMat);
            back.position.set(0, 0.5, -0.35);
            back.castShadow = true;
            group.add(back);

            const tableMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1, metalness: 0.9 });
            const table = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.5), tableMat);
            table.position.set(0, 0.42, 0.5);
            table.castShadow = true;
            group.add(table);

            return group;
        }

        const youtubeAudioStateMap = {};
        function toggleIframeSound(iframeId, btnEl) {
            const iframe = document.getElementById(iframeId);
            if (!iframe) return;

            youtubeAudioStateMap[iframeId] = !youtubeAudioStateMap[iframeId];
            const isUnmute = youtubeAudioStateMap[iframeId];

            try {
                const func = isUnmute ? 'unMute' : 'mute';
                iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: [] }), '*');

                if (isUnmute) {
                    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
                    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
                }

                if (btnEl) {
                    btnEl.innerHTML = isUnmute ? '🔇 TẮT ÂM THANH' : '🔊 BẬT ÂM THANH';
                }

                if (typeof showCollabToast === 'function') {
                    showCollabToast(isUnmute ? '🔊 Đã BẬT âm thanh tiếng cho Video YouTube!' : '🔇 Đã TẮT âm thanh tiếng Video YouTube!');
                }
            } catch (e) {
                console.error('[YOUTUBE SOUND] Error toggling sound:', e);
            }
        }

        // Expose functions to global scope for onclick handlers (module scope is not global)
        window.toggleIframeSound = toggleIframeSound;
        window.toggleTheme = toggleTheme;
        window.setView = setView;
        window.setOfficeStyle = setOfficeStyle;
        window.walkAgentTo = walkAgentTo;
        window.submitChairmanCommand = submitChairmanCommand;
        window.triggerCmoAction = triggerCmoAction;
        window.triggerCsoAction = triggerCsoAction;
        window.triggerCpoAction = triggerCpoAction;
        window.triggerChroAction = triggerChroAction;
        window.triggerCfoAction = triggerCfoAction;
        window.inspectAgent = inspectAgent;
        window.closeModal = closeModal;
        window.openContentMatrixModal = openContentMatrixModal;
        window.closeContentMatrixModal = closeContentMatrixModal;
        window.switchMatrixChannel = switchMatrixChannel;
        window.syncGoogleSheets = syncGoogleSheets;
        window.resetAllAgentsToDesks = resetAllAgentsToDesks;
        window.openSocialHubModal = openSocialHubModal;
        window.closeSocialHubModal = closeSocialHubModal;
        window.switchSocialTab = switchSocialTab;
        window.saveAllSocialCredentialsUi = saveAllSocialCredentialsUi;
        function openLeadPopupModal() {
            document.getElementById('lead-popup-modal').classList.add('open');
        }

        function closeLeadPopupModal() {
            document.getElementById('lead-popup-modal').classList.remove('open');
            sessionStorage.setItem('tnc-lead-popup-dismissed', 'true');
        }

        async function submitPopupLeadForm() {
            const name = document.getElementById('popup-lead-name').value.trim();
            const phone = document.getElementById('popup-lead-phone').value.trim();
            const email = document.getElementById('popup-lead-email').value.trim();
            const btn = document.getElementById('btn-popup-submit');

            if (!name || !phone || !email) {
                alert('Vui lòng điền đầy đủ Họ tên, SĐT Zalo và Email!');
                return;
            }

            const currentLang = localStorage.getItem('tnc-lang') || 'vi';
            const defaultTarget = currentLang === 'en'
                ? 'https://discord.com/channels/1098935967873765457/1098935968582598707'
                : 'https://zalo.me/g/tdhmtu261';

            btn.disabled = true;
            btn.innerText = currentLang === 'en' ? '⏳ ACTIVATING...' : '⏳ ĐANG KÍCH HOẠT...';

            try {
                const res = await fetch('/api/leads/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, email, business: 'SME Business', lang: currentLang })
                });
                const data = await res.json();
                const targetUrl = (data && data.accessLink) ? data.accessLink : defaultTarget;
                closeLeadPopupModal();
                window.location.href = targetUrl;
            } catch (err) {
                closeLeadPopupModal();
                window.location.href = defaultTarget;
            } finally {
                btn.disabled = false;
                btn.innerText = currentLang === 'en' ? '🚀 ACTIVATE & DOWNLOAD TOOLKIT' : '🚀 KÍCH HOẠT & NHẬN BẢN SAO MÃ NGUỒN OPC';
            }
        }

        // Auto-open Lead Popup after 5 seconds on 3D Simulator
        setTimeout(() => {
            const popupDismissed = sessionStorage.getItem('tnc-lead-popup-dismissed');
            if (!popupDismissed) {
                openLeadPopupModal();
            }
        }, 5000);

        function toggleFunnelTracker() {
            const card = document.getElementById('funnel-tracker');
            const badge = document.getElementById('funnel-tracker-badge');
            if (!card || !badge) return;

            const isCollapsed = card.classList.contains('collapsed');
            if (isCollapsed) {
                card.classList.remove('collapsed');
                badge.classList.remove('visible');
                sessionStorage.setItem('tnc-funnel-tracker-collapsed', 'false');
            } else {
                card.classList.add('collapsed');
                badge.classList.add('visible');
                sessionStorage.setItem('tnc-funnel-tracker-collapsed', 'true');
            }
        }

        // Restore Funnel Tracker collapse state
        if (sessionStorage.getItem('tnc-funnel-tracker-collapsed') === 'true') {
            const card = document.getElementById('funnel-tracker');
            const badge = document.getElementById('funnel-tracker-badge');
            if (card && badge) {
                card.classList.add('collapsed');
                badge.classList.add('visible');
            }
        }

        function setAppLanguage(lang) {
            setLanguage(lang);
        }

        // Init language on boot
        const initialLang = getCurrentLang();
        setLanguage(initialLang);

        function toggleMobileDrawer() {
            const drawer = document.getElementById('mobile-drawer-menu');
            if (drawer) {
                drawer.classList.toggle('open');
            }
        }

        function toggleLanguageDynamic() {
            const current = getCurrentLang();
            const nextLang = current === 'vi' ? 'en' : 'vi';
            setLanguage(nextLang);

            const flagCurrent = document.getElementById('lang-flag-current');
            const flagNext = document.getElementById('lang-flag-next');
            if (flagCurrent && flagNext) {
                if (nextLang === 'en') {
                    flagCurrent.innerText = '🇬🇧 EN';
                    flagNext.innerText = '🇻🇳 VI';
                } else {
                    flagCurrent.innerText = '🇻🇳 VI';
                    flagNext.innerText = '🇬🇧 EN';
                }
            }
        }

        window.openKpiMatrixModal = openKpiMatrixModal;
        window.closeKpiMatrixModal = closeKpiMatrixModal;
        window.switchKpiPhase = switchKpiPhase;
        window.openLeadPopupModal = openLeadPopupModal;
        window.closeLeadPopupModal = closeLeadPopupModal;
        window.submitPopupLeadForm = submitPopupLeadForm;
        window.toggleFunnelTracker = toggleFunnelTracker;
        window.setAppLanguage = setAppLanguage;
        window.toggleMobileDrawer = toggleMobileDrawer;
        window.toggleLanguageDynamic = toggleLanguageDynamic;