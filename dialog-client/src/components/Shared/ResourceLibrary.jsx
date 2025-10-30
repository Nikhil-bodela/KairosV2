import { useState } from 'react';
import { BookOpen, Video, FileText, Link as LinkIcon, Search, Filter } from 'lucide-react';

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data - replace with your actual data or API call
  const resources = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React framework',
      category: 'video',
      url: '#',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Python Tutorial',
      description: 'Comprehensive Python programming guide',
      category: 'document',
      url: '#',
      tags: ['Python', 'Programming', 'Backend']
    },
    {
      id: 3,
      title: 'Science Project Ideas',
      description: 'Collection of innovative science projects',
      category: 'article',
      url: '#',
      tags: ['Science', 'Projects', 'Innovation']
    },
    {
      id: 4,
      title: 'Math Problem Solving',
      description: 'Strategies for solving complex math problems',
      category: 'video',
      url: '#',
      tags: ['Math', 'Problem Solving']
    },
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'document', label: 'Documents', icon: FileText },
    { id: 'article', label: 'Articles', icon: LinkIcon },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'article':
        return <LinkIcon className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'document':
        return 'bg-blue-100 text-blue-700';
      case 'article':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-3 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
                <p className="text-gray-600 mt-1">Explore educational materials and resources</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`p-4 ${getCategoryColor(resource.category)}`}>
                  <div className="flex items-center justify-between">
                    {getCategoryIcon(resource.category)}
                    <span className="text-xs font-semibold uppercase">
                      {resource.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                    View Resource
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">{resources.length}</div>
              <div className="text-gray-600 text-sm mt-1">Total Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{filteredResources.length}</div>
              <div className="text-gray-600 text-sm mt-1">Matching Results</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-gray-600 text-sm mt-1">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
