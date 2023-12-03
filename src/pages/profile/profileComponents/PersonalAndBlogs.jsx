import React from 'react';

import PersonalTabs from './PersonalTabs';
import PersonalBlog from './PersonalBlog';

function PersonalAndBlogs() {
    return (
        <div className="personalTagAndBlog">
            <PersonalTabs />
            <PersonalBlog />
        </div>
    )
}

export default PersonalAndBlogs;