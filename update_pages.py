import os
import glob
import re

desktop_dir = r"d:\chaitu\desktop\New folder (4)"
pages_dir = os.path.join(desktop_dir, "src", "pages")

# Updated navItems array string
nav_items_str = """const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Briefcase, label: 'Internships', path: '/internships' },
    { icon: Code, label: 'Visualizer', path: '/visualizer' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];"""

pages = glob.glob(os.path.join(pages_dir, "*.jsx"))

for page in pages:
    if "LandingPage.jsx" in page or "LoginPage.jsx" in page or "OnboardingPage.jsx" in page:
        continue
    
    with open(page, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update lucide-react imports to make sure Award, Briefcase, Code are included
    import_match = re.search(r"import \{(.*?)\} from 'lucide-react';", content)
    if import_match:
        icons = [i.strip() for i in import_match.group(1).split(',')]
        for required_icon in ["Award", "Briefcase", "Code"]:
            if required_icon not in icons:
                icons.append(required_icon)
        new_import = f"import {{ {', '.join(icons)} }} from 'lucide-react';"
        content = content.replace(import_match.group(0), new_import)

    # 2. Update navItems
    # Find the navItems block
    nav_match = re.search(r"const navItems\s*=\s*\[.*?\];", content, re.DOTALL)
    if nav_match:
        content = content.replace(nav_match.group(0), nav_items_str)
    
    with open(page, "w", encoding="utf-8") as f:
        f.write(content)

# Now, read DashboardPage as a template hook to create the 3 new pages.
print("Updated navItems successfully in all pages.")
